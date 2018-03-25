'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const course = new Schema(
    {
        name: {type: String},
        publisher: {type: String},
        subject: {type: String},
        edition: {type: Number, default:1}
    } 
);
module.exports = mongoose.model('Course', course);