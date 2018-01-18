// $ID: discord.js.js, 17 Jan 2018, 13:48, Leonid 'n3o' Knyazev $

import { Module } from '../../types';
import { Client, Constants } from 'discord.js';

class Discord extends Module {
    /**
     * @constructor
     */
    constructor(bot, params) {
        super(bot, params);

        /**
         * discord.js client instance.
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', {
            value: new Client()
        });

        /**
         * discord.js events
         * @type {Object}
         */
        this.Events = Constants.Events;
    }


    /**
     * @start
     */
    async start() {
        this.bot.log.info('Starting Discord client...');

        return new Promise(resolve => resolve());
    }
}

export default Discord;
