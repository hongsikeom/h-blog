const mongoose = require('mongoose');
const slugify = require('slugify');

const htmlSchema = new mongoose.Schema({
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
        default: 'html'
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


htmlSchema.pre('save', function (next) {
    this.slug = slugify(`${this.subject}-${Date.now()}`, { lower: true });
    next();
});


htmlSchema.pre(/^find/, function (next) {
    this.sort({ createdAt: -1 });

    this.populate('author');
    next();
});

const HTML = mongoose.model('Html', htmlSchema);

module.exports = HTML;