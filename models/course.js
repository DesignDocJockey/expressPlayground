'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const course = new Schema(
    {
        name: {type: String},
        publisher: {type: String},
        subject: {type: String},
        edition: {type: Number, default:1}
    } 
);
module.exports = mongoose.model('Course', course);

/*
module.exports = class Course {
    constructor(courseName, 
                publisher, 
                edition=1) 
    {
        this.courseName = courseName;
        this.publisher = publisher;
        this.edition = edition;
    }
};
*/