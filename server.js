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

const javaRoutes = require('./routes/javaroutes')(Course);

app.use('/api/java', javaRoutes);

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
