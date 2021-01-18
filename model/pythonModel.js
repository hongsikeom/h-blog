const mongoose = require('mongoose');
const slugify = require('slugify');

const pythonSchema = new mongoose.Schema({
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
        default: 'pythone'
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


pythonSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next();
});


pythonSchema.pre(/^find/, function (next) {
    this.slug = slugify(`${this.title}-${Date.now()}`, { lower: true });

    this.populate('author');
    next();
});

const PYTHON = mongoose.model('Python', pythonSchema);

module.exports = PYTHON;