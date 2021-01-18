// const _ = require("lodash");
const About = require('../model/aboutModel');
const Contact = require('../model/contactModel');
const AppError = require("../utils/appError");
const returnModel = require('../utils/checkSubject');
const catchAsync = require('../utils/catchAsync');


exports.getHome = (req, res) => {
    res.status(200).render("home");
};

exports.getCompose = (req, res) => {
    res.status(200).render("compose");
};

exports.getPage = catchAsync(async (req, res, next) => {
    const subject = req.params.subject;
    const model = returnModel(subject);

    const posts = await model.find();

    res.status(200).render("pages", {
        subject,
        posts
    });
});

exports.findPost = catchAsync(async (req, res, next) => {
    const { subject, search } = req.params;
    const model = returnModel(subject);
    const posts = await model.find({ $or: [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }] });

    res.status(200).render("pages", {
        subject,
        posts
    })
});


exports.getPost = (mode) => catchAsync(async (req, res, next) => {
    const { subject, slug } = req.params;
    const model = returnModel(subject);
    const post = await model.findOne({ slug: slug });

    if (!post) {
        return next(new AppError("No post exists", 404));
    }

    if (mode === 'get') {
        res.status(200).render("post", {
            user: req.user,
            post
        })
    } else if (mode === 'edit') {
        res.status(200).render("edit", {
            user: req.user,
            post
        })
    }
});


exports.getAbout = catchAsync(async (req, res, next) => {
    const about = await About.find();

    res.status(200).render("about",
        {
            name: about[0].name,
            about: about[0].about
        });
});


exports.getContact = catchAsync(async (req, res, next) => {
    const contact = await Contact.find();

    res.status(200).render("contact", {
        mobile: contact[0].mobile,
        email: contact[0].email,
        gitHub: contact[0].gitHub,
        linkedIn: contact[0].linkedIn
    });
});



exports.getError = (req, res) => {
    res.status(200).render("home", {
        err: req.body.err
    });
}



exports.createPost = catchAsync(async (req, res, next) => {
    const { subject, title, content } = req.body;

    const pModel = returnModel(subject);

    const doc = await pModel.create({
        author: req.user.id,
        title,
        content
    })

    res.status(201).json({
        stats: 'success',
        data: doc
    })
});

exports.removePost = catchAsync(async (req, res, next) => {
    const { id, subject } = req.body;
    const pModel = returnModel(subject);

    const doc = await pModel.findByIdAndDelete(id);
    if (!doc) {
        return next(new AppError('No document found', 404));
    }

    res.status(204).json({
        stats: 'success',
        data: null
    });
});

exports.updatePost = catchAsync(async (req, res, next) => {
    const { id, subject, title, content } = req.body;

    const pModel = returnModel(subject);

    const doc = await pModel.findByIdAndUpdate(id, {
        title,
        content
    });

    if (!doc) {
        return next(new AppError('No document found', 404));
    }

    res.status(201).json({
        stats: 'success',
        data: {
            data: doc
        }
    })
});