// $ID: index.js, 23 Jan 2018, 11:50, Leonid 'n3o' Knyazev $

import { Command as BaseCommand } from 'patron.js';

class Command extends BaseCommand {
    /**
     * @override
     */
    constructor(options = {}) {
        super(options);

        /**
         * @type {Object}
         */
        this.params = {};
    }


    /**
     * @register
     */
    register(bot = null, params = {}) {
        this.bot = bot;

        Object.assign(params, this.params);
        Object.assign(this.params, params);
    }
}

export default Command;
