// $ID: index.js, 11 Jan 2018, 15:31, Leonid 'n3o' Knyazev $

import fs from 'fs';
import path from 'path';

class Config {
    /**
     * @constructor
     */
    constructor() {
        process.env.NODE_CONFIG_ENV = 'config';
        process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

        this.config = require('config'); // eslint-disable-line global-require
    }


    /**
     * @check
     */
    check() {
        return new Promise((resolve, reject) => {
            // check config
            if (!this.config || Object.keys(this.config).length === 0) {
                if (!fs.existsSync(path.join(__dirname, `../../config/${process.env.NODE_CONFIG_ENV}.js`))) {
                    reject(new Error(`Config file '/config/${process.env.NODE_CONFIG_ENV}.js' not found.`));
                } else {
                    reject(new Error(`Config file '/config/${process.env.NODE_CONFIG_ENV}.js' is empty.`));
                }
            }

            // bot.id
            if (!this.has('bot.id') || this.get('bot.id') === '') {
                reject(new Error('Param {bot.id} is empty. Please set {bot.id} in the config file.'));
            }

            // bot.token
            if (!this.has('bot.token') || this.get('bot.token') === '') {
                reject(new Error('Param {bot.token} is empty. Please set {bot.token} in the config file.'));
            }

            // commands.prefix
            if (!this.has('commands.prefix') || this.get('commands.prefix') === '') {
                reject(new Error('Param {commands.prefix} is empty. Please set {commands.prefix} in the config file.'));
            }


            // check sharding option
            if (this.has('sharding.enabled') && this.get('sharding.enabled')) {
                reject(new Error('Sharding not implemented yet. Please, disable this option (sharding.enabled) in config file.'));
            }

            resolve();
        });
    }


    /**
     * @get
     */
    get(option) {
        return this.config.get(option);
    }


    /**
     * @has
     */
    has(option) {
        return this.config.has(option);
    }
}

export default Config;
