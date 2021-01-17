//jshint esversion:6

const express = require("express");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const blogRouter = require('./routes/blogRoute');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const path = require('path');

dotenv.config({ path: './config.env' });

const app = express();

app.enable('trust proxy');


app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());


app.use('/', blogRouter);

app.use('*', (req, res, next) => {
    next(new AppError(`Not Found!`, 404));
});

app.use(errorController)

module.exports = app;
