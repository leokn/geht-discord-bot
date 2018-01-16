// $ID: index.js, 16 Jan 2018, 17:19, Leonid 'n3o' Knyazev $

import Events from 'events';

class Commands extends Events {
    /**
     * @constructor
     */
    constructor(bot) {
        super();

        this.bot = bot;
        this.logger = bot.logger;

        this.commands = {};
    }


    /**
     * @register
     */
    register(command, handler) {
        this.commands[command] = handler;
    }


    find(command) {
        return this.commands[command];
    }
}

export default Commands;
