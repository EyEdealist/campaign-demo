'use strict';

var mongoose = require('mongoose');

var pageSchema = require('./page');
var Page = mongoose.model('Page', pageSchema);
exports.Page = Page;
