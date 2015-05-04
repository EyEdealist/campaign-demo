'use strict';

// Wire routes
module.exports = function(app) {
    app.use('/pages', require('./pages'));
    app.use('/pages-live', require('./pages-live'));
};
