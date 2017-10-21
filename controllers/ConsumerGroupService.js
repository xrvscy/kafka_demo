'use strict';

const kafkaApi = require('../kafkaApi');
const Logger = require('logger-romens');
const logger = new Logger();

exports.subscribe = function(args, res, next) {
  /**
   * kafka consumer group to subscribe topics
   * interface of kafka consumer group which can subscribe specified topics
   *
   * payloads Payloads_1 specified options and topics (optional)
   * returns inline_response_200
   **/

  const payloads = args.payloads.value;

  logger.warn(payloads);

  const errorHandler = function(err) {
    logger.error(err.stack);
  };
  payloads.options.errorHandler = errorHandler;
  const consumerGroup = new kafkaApi.ConsumerGroup(
    payloads.options,
    payloads.topics
  );

  res.status(200).json({
    code: '200',
    message: 'Request to subscribe topics done'
  });
};

