var fs = require('fs');

var config = null;
var configFilePath = '';
var initialized = false;

exports.init = init;
exports.get = get;
exports.set = set;

/**
 * Initializes configuration manager. Reads configuration from the file which is located at
 * given path and writes changes on that file.
 *
 * @param {String} path - Full path of the configuration file. Configuration file should be a valid JSON file.
 *
 * @throws {Error} if configuration manager is already initialized.
 */
function init (path) {
    if (initialized) {
        throw new Error('Configuration manager is already initialized.');
    }
    config = require(path);
    configFilePath = path;
    initialized = true;
}

/**
 * Gets value of configuration which has given name.
 *
 * @param {String} name - Name of the configuration.
 *
 * @throws {Error} if configuration manager is not initialized.
 *
 * @returns {*} value of the configuration.
 */
function get (name) {
    var value = undefined;

    if (!initialized) {
        throw new Error('Configuration manager is not initialized.');
    }

    if (typeof name !== 'string' && !(name instanceof String)) {
        throw new Error('"name" is not a string.');
    }

    try {
        name.split('.').forEach(function (part, index) {
            if (index === 0) {
                value = config[part];
            } else {
                value = value[part];
            }
        });
    } catch (e) {
        value = undefined;
    }

    return value;
}

/**
 * Sets value of configuration which has given name to given value.
 *
 * @param {String} name - Name of the configuration.
 *
 * @throws {Error} if configuration manager is not initialized.
 *
 * @param {*} value - New value of the configuration.
 */
function set (name, value) {
    var lastObject = null;
    var lastPart = '';

    if (!initialized) {
        throw new Error('Configuration manager is not initialized.');
    }

    if (typeof name !== 'string' && !(name instanceof String)) {
        throw new Error('"name" is not a string.');
    }

    try {
        name.split('.').forEach(function (part, index, array) {
            if (index === 0) {
                lastObject = config;
            } else if (index < array.length - 1) {
                lastObject = lastObject[part];
            }

            if (index === array.length - 1) {
                lastPart = part;
            }
        });
    } catch (e) {
        return;
    }

    lastObject[lastPart] = value;
    fs.writeFileSync(configFilePath, config);
}