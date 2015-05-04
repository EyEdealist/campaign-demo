'use strict';

var async = require('async'),
    request = require('./request');

/**
 * Service for fetch data from ActionKit API /pages endpoint
 *
 * @class
 */
var ActionKit = {

    /**
     * Fetches pages from the ActionKit API
     *
     * @param {Number} offset - Page offset
     * @param {Number|null} limit - Pages per request (max 100)
     * @param {fetchCallback} done - Callback
     */
    fetch: function(offset, limit, done) {
        if(limit && limit > 100) {
            limit = 100;
        }

        var options = {
            qs: {
                _offset: offset || 0,
                _limit: limit || 20
            }
        };

        request.get(options, function(err, res, body) {
            if(err) {
                return done(err);
            }

            done(null, body);
        });
    },

    /**
     * Fetches a series of pages
     *
     * @param {Number} offset - Page offset
     * @param {Number} [max=0] - Max pages requested
     * @param {seriesCallback} done - Callback
     */
    series: function(offset, max, done) {
        if(typeof max === 'function') {
            done = max;
            max = 0;
        }

        var limit = 100;
        var pages = [];
        var total = 0;
        var start = offset;

        async.doWhilst(
            function(next) {
                // If there's a max, don't fetch more than we need
                var remaining = max - pages.length;
                if(max && remaining < limit) {
                    limit = remaining;
                }

                // Fetch pages
                ActionKit.fetch(start, limit, function(err, data) {
                    if(err) {
                        return next(err);
                    }

                    total = data.meta.total_count;
                    start += limit;
                    pages = pages.concat(data.objects);
                    next();
                });
            }, function() {
                // While there are more pages to fetch
                if(max) {
                    return pages.length < max;
                } else {
                    return pages.length+offset < total;
                }
            }, function(err) {
                // Done fetching
                done(err, pages);
            }
        );
    },

    /**
     * Scrape for latest [count] pages
     *
     * @param {Number} count - Number of pages
     * @param {scrapeCallback} done - Callback
     */
    scrape: function(count, done) {
        // Fetch first page to determine number of total pages
        ActionKit.fetch(0, 1, function(err, data) {
            if(err) {
                return next(err);
            }

            var total = data.meta.total_count;

            ActionKit.series(total - count, done);
        });
    }

};

module.exports = ActionKit;

/**
 * Callback which receives raw api json response
 *
 * @callback fetchCallback
 * @param {Error|null} err
 * @param {Object} data
 */

/**
 * Callback which receives json pages
 *
 * @callback seriesCallback
 * @param {Error|null} err
 * @param {Object[]} pages
 */

/**
 * Callback which receives latest pages (persisted)
 *
 * @callback scrapeCallback
 * @param {Error|null} err
 * @param {models.Page[]} pages
 */
