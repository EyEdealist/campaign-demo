'use strict';

var ActionKit = require('./action-kit');

var campaigns = [];
var latest = null;

function fetchLatest(count, done) {
    ActionKit.fetch(0,1, function(err, data) {
        if(err) {
            return callback(err);
        }

        var total = data.meta.total_count;
        var start = (latest) ? latest+1 : total-count;

        // If there is a new higher total
        // fetch all the newest pages
        if(total > start) {
            ActionKit.series(start, function(err, pages) {
                pages.reverse();
                campaigns = pages.concat(campaigns);
                latest = total;
                done();
            });
        } else {
            done();
        }
    });
}

function fetchEnough(count, done) {
    if(campaigns.length >= count) {
        return done();
    }

    var start = latest - count;
    var limit = latest - campaigns.length - start;

    ActionKit.series(start, limit, function(err, pages) {
        if(err) {
            return done(err);
        }

        pages.reverse();
        campaigns = campaigns.concat(pages);
        done();
    })
}

var self = module.exports = {

    /**
     * Gets the latest pages in reverse chronological order
     *
     * @memberOf ActionKitLive
     * @param {Number} [count=20] - Number of latest pages to retrieve (max 100)
     * @param {latestCallback} callback
     */
    latest: function(count, callback) {
        if(typeof count === 'function') {
            callback = count;
            count = 20;
        }

        // Ensure we have all the latest records
        fetchLatest(count, function(err) {
            if(err) {
                return callback(err);
            }

            // Ensure we have enough records
            fetchEnough(count, function(err) {
                if(err) {
                   return callback(err);
                }

                callback(null, campaigns.slice(0, count));
            });
        });
    }

};

/**
 * @callback latestCallback
 * @param {Error} [err] Error object
 * @param {Object[]} pages Latest pages
 */
