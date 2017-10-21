'use strict';

const kafkaApi = require('../kafkaApi');
const Logger = require('logger-romens');
const logger = new Logger();

exports.publish = function(args, res, next) {
  /**
   * kafka producer to publish topics
   * interface of kafka producer which can accept specified payloads and publish them
   *
   * payloads List array of ProduceRequest (optional)
   * returns inline_response_200
   **/

  const payloads = args.payloads.value;

  logger.warn(payloads);

  const client = new kafkaApi.Client();
  const producer = new kafkaApi.Producer({
    client: client.getClient()
  });

  const errorHandler = function(err) {
    logger.error(err.stack);
  };
  producer.send({
    payloads: payloads,
    errorHandler: errorHandler
  });

  res.status(200).json({
    code: '200',
    message: 'Request to publish topics done'
  });
};

