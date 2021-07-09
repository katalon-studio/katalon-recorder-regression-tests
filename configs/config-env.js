const dotenv = require('dotenv');
dotenv.config();

const config = {
    extPath: process.env.EXTENSION_PATH || '',
    headless: process.env.HEADLESS || '',
    slowmo: process.env.SLOWMO || '',
}

module.exports = {
    config
}