'use strict';

const courseController = function(Course) 
{
    var get = (request, response) => {
            console.log('Get Endpoint Reached ');
            console.log('Request Query String: ' + request.query);
            let query = {};
            if(request.query.publisher)
                query.publisher = request.query.publisher.toLowerCase();

            Course.find(query, (error, courses) => {
            if(error) {
                response.status(500);
                response.send(error);
            }
            else {
                response.status(200);
                response.json(courses);
            }
        });
    };   

    var getById = (request, response) => {
        console.log('GetById Endpoint Reached ');
        response.json(request.course);
    };

    var post = (request, response) => {
        console.log('Post Endpoint Reached ');
        console.log('Request Body: ' + request.body);

        if(!request.body.name || request.body.name === '') {
            response.status(400);
            response.send('Course Title Required');
        }
        else {
            let newCourse = new Course(request.body);
            newCourse.save( (error) => {
                if(error) {
                    response.status(500);
                    response.send(error);
                }
                else {    
                    response.send(newCourse);
                }
            });
        }
    };

    var put = (request, response) => {
        console.log('Put Endpoint Reached: ' + request.body);
        console.log('Course in Put Endpoint: ' + request.course);

        if(!request.body.name || request.body.name === '') {
            response.status(400);
            response.send('Course Title Required');
        }

        request.course.name = request.body.name;
        request.course.publisher = request.body.publisher;
        request.course.subject = request.body.subject;
        request.course.edition = request.body.edition;

        request.course.save( (error) => {
             if(error) {
                 response.status(500);
                 response.send(error);
             }
             else
                 response.json(request.course);
         });  
    };

    var patch = (request, response) => {
        console.log('Patch Endpoint Reached: ' + request.body);
        console.log('Course in Patch Endpoint: ' + request.course);
        if(request.body._id)
          delete request.body._id;

        for(let property in request.body) {
          request.course[property] = request.body[property];
        }

        request.course.save( (error) => {
              if(error) {
                  response.status(500);
                  response.send(error);
              }
              else 
                  response.json(request.course);
        });
    };

    var remove = (request, response) => {
        console.log('Delete Endpoint Reached: ' + request.body);
        console.log('Course in Delete Endpoint: ' + request.course);
        request.course.remove( (error) => {
            if(error) {
                response.status(500);
                response.send(error);
            }
            else {
                response.status(204);
                response.send('Removed');
            }
        });
    };

    return {
        get: get,
        getById: getById,
        post: post,
        put: put,
        patch: patch,
        delete: remove
    };
};

module.exports = courseController;

/*
class courseController
{
    constructor(Course) {
        this._course = Course;
    }

    get(request, response)  {
        console.log('Get Endpoint Reached ');
        console.log('Request Query String: ' + request.query);
        let query = {};
        if(request.query.publisher)
            query.publisher = request.query.publisher.toLowerCase();

        this._course.find(query, (error, courses) => {
        if(error) 
            response.status(500).send(error);
        else
            response.json(courses);
        });
    }

    post(request, response)  {
        console.log('Post Endpoint Reached ');
        console.log('Request Body: ' + request.body);
        let newCourse = new Course(request.body);
        newCourse.save( (error) => {
            if(error)
                response.status(500).send(error);
            else
                response.status(201).send(newCourse);
        });
    }
}; 

module.exports = courseController;
*/