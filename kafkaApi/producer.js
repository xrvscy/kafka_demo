'use strict';

const kafka = require('kafka-node');
const Logger = require('logger-romens');
const logger = new Logger();
const jsyaml = require('js-yaml');
const fs = require('fs');
const kafkaConfig = jsyaml.safeLoad(fs.readFileSync('./config/kafka.yaml', 'utf8'));
const _ = require('lodash');

function Producer(options) {
    const client = options.client;

    const defaultOptions = kafkaConfig.producer;

    options = _.defaults(options, defaultOptions);
    this.producer = new kafka.HighLevelProducer(client, options);
}

Producer.prototype.send = function send(options) {
    const self = this;

    this.producer.on('ready', () => {
        self.producer.send(options.payloads, (err, data) => {
            logger.debug(data);
        });
    });

    this.producer.on('error', options.errorHandler);
};

Producer.prototype.createTopics = function createTopics(options) {
    const self = this;

    const defaultTopics = kafkaConfig.topics;
    const topics = !_.isEmpty(options.topics) ? options.topics : defaultTopics;
    const async = _.isBoolean(options.async) ? options.async : false;
    const cb = options.cb;

    self.producer.createTopics(topics, async, cb);
};

module.exports = Producer;

