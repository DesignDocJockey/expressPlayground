'use strict';

const express = require('express');
const router =  express.Router();

const BASE_ROUTE = '/';
const JAVA_ROUTE_BY_ID = '/:courseId';

module.exports = (Course) =>
{
    const courseCtrl = require('../controller/coursescontroller')(Course);
    router.route(BASE_ROUTE)
        .post(courseCtrl.post)
        .get(courseCtrl.get);

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
        .get(courseCtrl.getById)
        .put(courseCtrl.put)
        .patch(courseCtrl.patch)
        .delete(courseCtrl.delete);
    return router;
};

//http://erikaybar.name/using-es6-promises-with-mongoosejs-queries/