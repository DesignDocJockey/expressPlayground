'use strict';

const express = require('express');
const router =  express.Router();

const BASE_ROUTE = '/';
const JAVA_ROUTE_BY_ID = '/:courseId';

module.exports = (Course) =>
{
    router.route(BASE_ROUTE)
        .post( (request, response) => {
            console.log('Post Endpoint Reached ');
            console.log('Request Body: ' + request.body);
            let newCourse = new Course(request.body);
            newCourse.save( (error) => {
                if(error)
                    response.status(500).send(error);
                else
                    response.status(201).send(newCourse);
            });
        })
        .get( (request, response) => {
            console.log('Get Endpoint Reached ');
            console.log('Request Query String: ' + request.query);
            let query = {};
            if(request.query.publisher)
                query.publisher = request.query.publisher.toLowerCase();

            Course.find(query, (error, courses) => {
                if(error) 
                    response.status(500).send(error);
                else
                    response.json(courses);
            });
        });

    //Implementing Express MiddleWare
    router.use(JAVA_ROUTE_BY_ID, (request, response, next) => {
        let courseId = null;
        if(request.params.courseId && request.params.courseId !== '') {
            courseId = request.params.courseId;
        }
        Course.findById(courseId, (error, course) => {
            if(error) {
                response.status(500).send(error);
            }
            else if(course) {
                request.course = course;
                next();
            }
            else
                response.status(404).send('course not found');
        });
    });

    router.route(JAVA_ROUTE_BY_ID)
        .get( (request, response) => {
               response.json(request.course);
        })
        .put( (request, response) => {
               console.log('Put Endpoint Reached: ' + request.body);
               console.log('Course in Put Endpoint: ' + request.course);
               request.course.name = request.body.name;
               request.course.publisher = request.body.publisher;
               request.course.subject = request.body.subject;
               request.course.edition = request.body.edition;

               request.course.save( (error) => {
                    if(error)
                        response.status(500).send(error);
                    else
                        response.json(request.course);
                });  
        })
        .patch( (request, response) => {
              console.log('Patch Endpoint Reached: ' + request.body);
              console.log('Course in Patch Endpoint: ' + request.course);
              if(request.body._id)
                delete request.body._id;

              for(let property in request.body) {
                request.course[property] =  request.body[property];
              }

              request.course.save( (error) => {
                    if(error)
                        response.status(500).send(error);
                    else 
                        response.json(request.course);
              });
        })
        .delete( (request, response) =>  {
            console.log('Delete Endpoint Reached: ' + request.body);
            console.log('Course in Delete Endpoint: ' + request.course);
            request.course.remove( (error)=> {
                if(error)
                    response.status(500).send(error);
                else
                    response.status(204).send('Removed');
            });
        });
    return router;
};

//http://erikaybar.name/using-es6-promises-with-mongoosejs-queries/