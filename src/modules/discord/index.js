// $ID: index.js, 12 Jan 2018, 16:58, Leonid 'n3o' Knyazev $

import Module from '../../types/module';

class Discord extends Module {
    /**
     * @constructor
     */
    constructor(bot, params) {
        super();

        this.bot = bot;
        this.logger = bot.logger;

        this.params = params;
    }


    /**
     * @start
     */
    start() {
        this.emit('started');
    }
}

export default Discord;
