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


mongoSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next();
});


mongoSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });

    this.populate('author');
    next();
});

const MONGO = mongoose.model('Mongo', mongoSchema);

module.exports = MONGO;