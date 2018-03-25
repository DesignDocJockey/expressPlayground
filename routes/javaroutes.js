'use strict';

const express = require('express');
const router =  express.Router();

const BASE_ROUTE = '/';
const JAVA_ROUTE_BY_ID = '/:courseId';

module.exports = function(Course)
{
    router.route(BASE_ROUTE)
        .post( (request, response) => {
            let newCourse = new Course(request.body);
            newCourse.save();
            response.status(201).send(newCourse);
        })
        .get( (request, response) => {
            let query = {};
            if(request.query.publisher)
                query.publisher = request.query.publisher.toLowerCase();

            Course.find(query, (error, courses) => {
                if(error) {
                    response.status(500).send(error);
                }
                else
                    response.json(courses);
            });
        });

    router.route(JAVA_ROUTE_BY_ID)
        .get( (request, response) => {
                let courseId = null;
                if(request.params.courseId && request.params.courseId !== '') {
                    courseId = request.params.courseId;
                }

                Course.findById(courseId, (error, courses) => {
                    if(error) {
                        response.status(500).send(error);
                    }
                    else
                        response.json(courses);
            });
        });

    return router;
};