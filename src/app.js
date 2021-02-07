const logger  = require('./utils/log-manager.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const configManager = require('./utils/config-manager');
const path = require('path');
configManager.init(path.join(__dirname, 'config/config.json'));

const app = express();
process.on('uncaughtException', function(err) {
    logger.error(err.stack);
});
app.set('port', 8080);

// app.use(addResponseMethods);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const router = require('./routers/records');

app.use('/api', router);

app.use(function(err, req, res, next) {
    logger.error(err.message)
    const responseObj = {
        code: 500,
        msg: '500 Internal Server Error - ' + err.message,
        records: []
    };
    res.status(500)
    res.send(responseObj);
});


module.exports = app;