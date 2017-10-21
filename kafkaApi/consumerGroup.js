'use strict';

const kafka = require('kafka-node');
const Logger = require('logger-romens');
const logger = new Logger();
const jsyaml = require('js-yaml');
const fs = require('fs');
const kafkaConfig = jsyaml.safeLoad(fs.readFileSync('./config/kafka.yaml', 'utf8'));
const _ = require('lodash');

function ConsumerGroup(options, topics) {
    const defaultOptions = kafkaConfig.consumerGroup;
    const defaultTopics = kafkaConfig.topics;

    options = _.defaults(options, defaultOptions);
    topics = topics ? topics : defaultTopics;

    this.consumerGroup = new kafka.ConsumerGroup(options, topics);

    this.consumerGroup.on('message', function (message) {
        logger.debug(message);
    });

    this.consumerGroup.on('error', options.errorHandler);
}

ConsumerGroup.prototype.assign = function assign(topicPartition, groupMembers, handler) {
    const self = this;

    self.consumerGroup.assign(topicPartition, groupMembers, handler);
};

module.exports = ConsumerGroup;

