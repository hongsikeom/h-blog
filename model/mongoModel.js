const mongoose = require('mongoose');
const slugify = require('slugify');

const mongoSchema = new mongoose.Schema({
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
        default: 'mongo-mongoose'
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


mongoSchema.pre('save', function (next) {
    this.slug = slugify(`${this.subject}-${Date.now()}`, { lower: true });
    next();
});


mongoSchema.pre(/^find/, function (next) {
    this.sort({ createdAt: -1 });

    this.populate('author');
    next();
});

const MONGO = mongoose.model('Mongo', mongoSchema);

module.exports = MONGO;