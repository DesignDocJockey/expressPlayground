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


const app = express();

const PORT = process.env.PORT || 3000;
const JAVA_ROUTE = '/java';

const javaRouter =  express.Router();
javaRouter.route(JAVA_ROUTE)
        .get((request, response) => {
            let javaCourses = { courses: ['Data Structures in Java for Noobs', 
                                       'Treehouse - Introduction to Spring',
                                       'Pluralsight - Java Fundamentals - The Java Language',
                                       ''
                                    ]
                           };
            response.json(javaCourses);                 
        });

app.use('/api', javaRouter);

app.get('/', (req, resp) => {
    console.log('Hitting the / directory');
    resp.render('<html><body> Express response for: ' + req.url + ' </body></html>')
});

console.log('Starting Server on Port: ' + PORT);
app.listen(PORT, ()=> {
    console.log('Listening on Port: ' + PORT);
});