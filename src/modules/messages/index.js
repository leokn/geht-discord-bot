// $ID: index.js, 16 Jan 2018, 16:11, Leonid 'n3o' Knyazev $

import Module from '../../types/module';

class Messages extends Module {
    /**
     * @constructor
     */
    constructor(bot, params) {
        super();

        this.params = params;
        this.logger = bot.logger;
    }
}

export default Messages;
