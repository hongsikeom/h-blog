const mongoose = require('mongoose');
const slugify = require('slugify');

const mysqlSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        default: 'mysql'
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date,
    slug: String
});


mysqlSchema.pre('save', function (next) {
    this.slug = slugify(`${this.title}-${Date.now()}`, { lower: true });
    next();
});


mysqlSchema.pre(/^find/, function (next) {
    this.sort({ createdAt: -1 });

    this.populate('author');
    next();
});

const MYSQL = mongoose.model('Mysql', mysqlSchema);

module.exports = MYSQL;