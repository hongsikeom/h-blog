const AppError = require('../utils/appError');

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.satus = err.status || 'error';

    return res.status(err.statusCode).render('error', {
        title: 'Error!',
        msg: err.message
    });
}

module.exports = globalErrorHandler;