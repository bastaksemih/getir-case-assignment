// Init config manager
const path = require('path');
const configManager = require('./src/utils/config-manager');
// configManager.init(path.join(__dirname, 'src/config/config.json'));

const app = require('./src/app');
const logger  = require('./src/utils/log-manager.js');

app.listen(process.env.PORT || configManager.get('port'));
logger.info(`Listening on http://localhost:${configManager.get('port')}`);