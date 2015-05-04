'use strict';

var Schema = require('mongoose').Schema;

var pageSchema = Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
    allow_multiple_responses: {
        type: Boolean,
        required: true,
        default: true
    },
    fields: {
        type: Schema.Types.Mixed
    },
    followup: {
        type: Schema.Types.Mixed
    },
    goal: {
        type: Number
    },
    goal_type: {
        type: String,
        required: true,
        default: 'actions'
    },
    hidden: {
        type: Boolean,
        required: true,
        default: false
    },
    hosted_with: {
        type: Schema.Types.Mixed,
        required: true,
        default: 'ActionKit Hosted Pages'
    },
    language: {
        type: Schema.Types.Mixed,
        default: 'English'
    },
    list: {
        type: Schema.Types.Mixed,
        required: true
    },
    multilingual_campaign: {
        type: Schema.Types.Mixed
    },
    name: {
        type: String,
        unique: true
    },
    never_filter: {
        type: Boolean,
        required: true,
        default: false
    },
    recognize: {
        type: String,
        required: true,
        default: 'once'
    },
    required_fields: {
        type: [Schema.Types.Mixed],
        default: [2, 11]
    },
    resource_uri: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    },
    tags: {
        type: [Schema.Types.Mixed]
    },
    title: {
        type: String,
        required: true,
        default: ''
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        default: ''
    }
}, {
    _id: false
});

module.exports = pageSchema;
