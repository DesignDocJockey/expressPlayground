'use strict';

/* --Basic NodeJs server app
const http = require('http');
const app = require('./serverApp');

console.log('Starting Server on port: 3000');

const server = http.createServer(app.serverApp);
server.listen(3000);
*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const db = mongoose.connect("mongodb://localhost/courses");
const Course = require('./models/course');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const JAVA_ROUTE = '/java';
const JAVA_ROUTE_BY_ID = '/java/:courseId';

const router =  express.Router();
router.route(JAVA_ROUTE)
        .post((request, response) => {
            let newCourse = new Course(request.body);
            newCourse.save();
            response.status(201).send(newCourse);
        })
        .get((request, response) =>
        {
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

app.use('/api', router);

app.get('/', (req, resp) => {
    console.log('Hitting the / directory');
    resp.render('<html><body> Express response for: ' + req.url + ' </body></html>')
});

console.log('Starting Server on Port: ' + PORT);
app.listen(PORT, ()=> {
    console.log('Listening on Port: ' + PORT);
});

  /*
            let javaCourses = { courses: ['Data Structures in Java for Noobs', 
                                       'Treehouse - Introduction to Spring',
                                       'Pluralsight - Java Fundamentals - The Java Language',
                                       ''
                                    ]
                           };*/
