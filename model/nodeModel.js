const mongoose = require('mongoose');
const slugify = require('slugify');

const nodeSchema = new mongoose.Schema({
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
        default: 'node-express'
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


nodeSchema.pre('save', function (next) {
    this.slug = slugify(`${this.title}-${Date.now()}`, { lower: true });
    next();
});


nodeSchema.pre(/^find/, function (next) {
    this.sort({ createdAt: -1 });

    this.populate('author');
    next();
});

const NODE = mongoose.model('Node', nodeSchema);

module.exports = NODE;