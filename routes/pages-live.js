'use strict';

var express = require('express'),
    ActionKitLive = require('../lib/action-kit-live');

var router = express.Router();

/**
 * GET latest campaign pages in real-time
 */
router.get('/', function(req, res, next) {
    var count = parseInt(req.query.count || 20);

    if(isNaN(count)) {
        return next(new Error('count must be a number'));
    }

    ActionKitLive.latest(count, function(err, pages) {
        if(err) {
            return next(err);
        }

        res.json(pages);
    });
});

module.exports = router;
