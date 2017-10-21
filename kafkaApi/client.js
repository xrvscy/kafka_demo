'use strict';

const kafka = require('kafka-node');
const Logger = require('logger-romens');
const logger = new Logger();
const _ = require('lodash');
const jsyaml = require('js-yaml');
const fs = require('fs');
const kafkaConfig = jsyaml.safeLoad(fs.readFileSync('./config/kafka.yaml', 'utf8'));

function Client(options) {
    const defaultOptions = kafkaConfig.client;

    options = _.defaults(options, defaultOptions);
    this.client = new kafka.Client(
        options.connection,
        options.clientId,
        options.zkOptions,
        options.noAckBatchOptions
    );
}

Client.prototype.getClient = function getClient() {
    return this.client;
};

module.exports = Client;

