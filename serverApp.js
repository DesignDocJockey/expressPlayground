'use strict';

module.exports.serverApp = function(request, response) 
{
    let now = new Date();
    console.log('Incoming Request on: ' +  now);
    console.log('Handling Request on url ' + request.url + '...');
    
    console.log('Generating a response...');
    response.write('<html><body> Here is a response for: ' + request.url + ' </body></html>');
    response.end();
};