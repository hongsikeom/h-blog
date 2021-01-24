const mongoose = require('mongoose');
const slugify = require('slugify');

const cSchema = new mongoose.Schema({
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

cSchema.pre('save', function (next) {
    this.slug = slugify(`${this.subject}-${Date.now()}`, { lower: true });
    next();
});

cSchema.pre(/^find/, function (next) {
    this.sort({ createdAt: -1 });

    this.populate('author');
    next();
});

const C = mongoose.model('C', cSchema);

module.exports = C;