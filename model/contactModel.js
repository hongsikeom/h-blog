const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    mobile: String,
    email: String,
    gitHub: String,
    linkedIn: String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;