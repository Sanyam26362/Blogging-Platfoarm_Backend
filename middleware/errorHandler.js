module.exports = (err,req,res,next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    req.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV=== 'devlopment' ? err.stack: undefined

    });
};
