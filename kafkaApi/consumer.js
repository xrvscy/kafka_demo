'use strict';

const kafka = require('kafka-node');
const Logger = require('logger-romens');
const logger = new Logger();
const jsyaml = require('js-yaml');
const fs = require('fs');
const kafkaConfig = jsyaml.safeLoad(fs.readFileSync('./config/kafka.yaml', 'utf8'));
const _ = require('lodash');

function Consumer(options, topics) {
    const client = options.client;

    const defaultOptions = kafkaConfig.consumer;
    const defaultTopics = kafkaConfig.topics;

    options = _.defaults(options, defaultOptions);
    topics = topics ? topics : defaultTopics;

    this.consumer = new kafka.HighLevelConsumer(client, topics, options);
}

Consumer.prototype.listen = function listen(options) {
    const self = this;

    self.consumer.on('message', (message) => {
        logger.warn(message);
        // options.handler(message);
    });

    self.consumer.on('error', (err) => {
        options.errorHandler(err);
    })
};

module.exports = Consumer;

