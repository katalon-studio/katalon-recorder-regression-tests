const { config } = require('./config-env');

module.exports = {
    launch: {
        headless: config.headless !== 'false',
        // slowMo: config.slowmo ? config.slowmo : 0,
        devtools: true
    }
}