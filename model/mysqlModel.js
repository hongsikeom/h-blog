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
        default: 'c'
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
    this.slug = slugify(this.title, { lower: true })
    next();
});


mysqlSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });

    this.populate('author');
    next();
});

const MYSQL = mongoose.model('Mysql', mysqlSchema);

module.exports = MYSQL;