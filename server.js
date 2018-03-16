'use strict';

/* --Basic NodeJs server app
var http = require('http');
var app = require('./serverApp');

console.log('Starting Server on port: 3000');

var server = http.createServer(app.serverApp);
server.listen(3000);
*/

var http = require('http');
var express = require('express');
var app = express();



var server = http.createServer(app);

server.listen(3000);