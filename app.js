'use strict';

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config.json'),
    routes = require('./routes');

var app = express();

// Serve favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// Setup request logging
app.use(logger('dev'));

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(config.mongodb);

// Wire routes
routes(app);

// Catch and handle 404 for unmatched routes
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler (w/ stacktrace)
if(app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        var error = {
            status: err.status || 500,
            message: err.message,
            error: err
        };

        res.status(error.status);
        res.json(error);
    });
}

// Production error handler (w/o stacktrace)
app.use(function (err, req, res, next) {
    var error = {
        status: err.status || 500,
        message: err.message
    };

    res.status(error.status);
    res.json(error);
});

module.exports = app;
