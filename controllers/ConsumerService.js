'use strict';

const kafkaApi = require('../kafkaApi');
const Logger = require('logger-romens');
const logger = new Logger();

exports.consumerSubscribe = function(args, res, next) {
  /**
   * kafka consumer to subscribe topics
   * interface of kafka consumer which can subscribe specified topics
   *
   * payloads Payloads_2 specified options and topics (optional)
   * returns inline_response_200
   **/

  const payloads = args.payloads.value;

  logger.warn(payloads);

  const client = new kafkaApi.Client();

  payloads.options.client = client.getClient();

  const consumer = new kafkaApi.Consumer(
      payloads.options,
      payloads.topics
  );

  const errorHandler = function(err) {
    logger.error(err.stack);
  };

  const handler = function(message) {
    logger.debug(message);
  };

  consumer.listen({
    handler: handler,
    errorHandler: errorHandler
  });
  res.status(200).json({
    code: '200',
    message: 'Request to subscribe topics done'
  });
};

