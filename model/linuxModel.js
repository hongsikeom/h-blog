const mongoose = require('mongoose');
const slugify = require('slugify');

const linuxSchema = new mongoose.Schema({
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


linuxSchema.pre('save', function (next) {
    this.slug = slugify(`${this.subject}-${Date.now()}`, { lower: true });
    next();
});


linuxSchema.pre(/^find/, function (next) {
    this.sort({ createdAt: -1 });

    this.populate('author');
    next();
});

const LINUX = mongoose.model('Linux', linuxSchema);

module.exports = LINUX;