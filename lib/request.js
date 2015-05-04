'use strict';

var request = require('request'),
    pkg = require('../package.json'),
    config = require('../config.json');

// Setup defaults for ActionKit API requests
var req = request.defaults({
    url: config.actionKit.url,
    headers: {
        'User-Agent': pkg.name
    },
    auth: config.actionKit.auth,
    json: true
});

module.exports = req;
