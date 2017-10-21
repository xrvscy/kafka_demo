'use strict';

var url = require('url');

var ConsumerGroup = require('./ConsumerGroupService');

module.exports.subscribe = function subscribe (req, res, next) {
  ConsumerGroup.subscribe(req.swagger.params, res, next);
};
