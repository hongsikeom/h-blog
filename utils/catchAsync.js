const catchAsync = fn => (res, req, next) => {
    fn(res, req, next).catch(next);
}

module.exports = catchAsync;