'use strict';

var url = require('url');

var Producer = require('./ProducerService');

module.exports.publish = function publish (req, res, next) {
  Producer.publish(req.swagger.params, res, next);
};
