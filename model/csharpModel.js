const mongoose = require('mongoose');
const slugify = require('slugify');

const csharpSchema = new mongoose.Schema({
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
        default: 'csharp'
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


csharpSchema.pre('save', function (next) {
    this.slug = slugify(`${this.title}-${Date.now()}`, { lower: true });
    next();
});


csharpSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });

    this.populate('author');
    next();
});

const CSHARP = mongoose.model('Csharp', csharpSchema);

module.exports = CSHARP;