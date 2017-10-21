'use strict';

var url = require('url');

var Consumer = require('./ConsumerService');

module.exports.consumerSubscribe = function consumerSubscribe (req, res, next) {
  Consumer.consumerSubscribe(req.swagger.params, res, next);
};
