// $ID: plugin.js, 16 Jan 2018, 16:58, Leonid 'n3o' Knyazev $

import Events from 'events';

class Plugin extends Events {
    /**
     * @constructor
     */
    constructor(bot, params) {
        super();

        this.bot = bot;
        this.params = params;
    }
}

export default Plugin;
