var winston = require('winston');


exports.info = info;
exports.error = error;
exports.warn = warn;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});


// enable below line to write into a file
winston.add(logger);


function getDate(){
    let date = new Date().toISOString();
    return date.replace('T', ' ').replace('Z', '');
}

function info (message) {

    winston.info(getDate() + ' - ' + message);
}

function error (message) {
    winston.error(getDate() + ' - ' + message);
}

function warn (message) {
    winston.warn(getDate() + ' - ' + message);
}
