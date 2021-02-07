const configManager = require('./config-manager');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//mongoose config
mongoose.connect(configManager.get('mongo').uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose;