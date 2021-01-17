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


htmlSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next();
});


htmlSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });

    this.populate('author');
    next();
});

const HTML = mongoose.model('Html', htmlSchema);

module.exports = HTML;