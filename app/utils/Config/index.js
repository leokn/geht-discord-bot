// $ID: index.js, 22 Jan 2018, 15:20, Leonid 'n3o' Knyazev $

import fs from 'fs';
import path from 'path';

class Config {
    constructor() {
        // https://www.npmjs.com/package/config
        process.env.NODE_CONFIG_ENV = 'config';
        process.env.NODE_CONFIG_DIR = './data/config';
        process.env.NODE_CONFIG_STRICT_MODE = 'true';
        process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

        this.config = require('config'); // eslint-disable-line global-require

        // add a bot version to the config
        // TODO: add version from package.json
        this.config.version = '0.0.1';
    }

    async check(bot) {
        bot.log.info('Checking configuration...');

        // check config
        if (!this.config || Object.keys(this.config).length === 0) {
            if (!fs.existsSync(path.join(__dirname, `../../config/${process.env.NODE_CONFIG_ENV}.js`))) {
                throw new Error(`[config] Config file '/config/${process.env.NODE_CONFIG_ENV}.js' not found.`);
            } else {
                throw new Error(`[config] Config file '/config/${process.env.NODE_CONFIG_ENV}.js' is empty.`);
            }
        }

        // bot.id
        if (!this.has('id') || this.get('id') === '') {
            throw new Error('[config] Param {bot.id} is empty. Please set {bot.id} in the config file.');
        }

        // bot.token
        if (!this.has('token') || this.get('token') === '') {
            throw new Error('[config] Param {bot.token} is empty. Please set {bot.token} in the config file.');
        }
    }

    get(option) {
        return this.config.get(option);
    }

    has(option) {
        return this.config.has(option);
    }
}

export default Config;
