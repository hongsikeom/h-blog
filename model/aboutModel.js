const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    name: String,
    about: String
});

const About = mongoose.model('About', aboutSchema);

module.exports = About;