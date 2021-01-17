const mongoose = require('mongoose');
const slugify = require('slugify');

const cppSchema = new mongoose.Schema({
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
        default: 'cpp'
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


cppSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next();
});

cppSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: { $ne: true } });

    this.populate('author');
    next();
});

const CPP = mongoose.model('Cpp', cppSchema);

module.exports = CPP;