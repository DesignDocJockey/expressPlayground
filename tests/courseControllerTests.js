'use strict';

const should = require('should');
const sinon = require('sinon');

describe('Courses Controller Tests', () => 
{
    describe('Post', () => 
    {
        it('should not allow empty course title', 
        () => {
                let mockCourse = () => {this.save = function(){}}; 
                let mockRequest = {
                    body: {
                        publisher: "wrox" ,
                        subject: "java, programming",
                        edition: 1
                    }
                };

                let mockResponse = {
                    status: sinon.spy(),
                    send: sinon.spy()
                };

                const courseCtrl = require('../controller/coursescontroller')(mockCourse);
                courseCtrl.post(mockRequest, mockResponse);    
                mockResponse.status
                            .calledWith(400)
                            .should
                            .equal(true, `Bad Status ${mockResponse.status.args[0][0]}`);

                mockResponse.send
                            .calledWith('Course Title Required')
                            .should
                            .equal(true);
        })
    });
});