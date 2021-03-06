// $ID: index.js, 23 Jan 2018, 11:50, Leonid 'n3o' Knyazev $

import { Command as BaseCommand } from 'patron.js';

class Command extends BaseCommand {
    constructor(options = {}) {
        super(options);

        /**
         * @type {Object}
         */
        this.params = {};
    }

    register(bot = null, log = null, config = null, params = {}) {
        // Register Bot instance.
        Object.defineProperty(this, 'bot', {
            value: bot
        });

        // Register Logger instance.
        Object.defineProperty(this, 'log', {
            value: log
        });

        // Register Config instance.
        Object.defineProperty(this, 'config', {
            value: config
        });

        // Configuring...
        Object.assign(params, this.params);
        Object.assign(this.params, params);
    }
}

export default Command;
