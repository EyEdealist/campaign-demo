'use strict';

var express = require('express'),
    models = require('../models');

var router = express.Router();

/**
 * GET latest campaign pages
 */
router.get('/', function(req, res, next) {
    var query = models.Page
        .find()
        .select('title type')
        .sort('-created_at')
        .limit(20);

    if(req.query.type) {
        var type = req.query.type.split(',');
        query = query.where('type').in(type);
    }

    query.exec(function(err, pages) {
        if(err) {
            return next(err);
        }

        res.json(pages);
    });
});

module.exports = router;
