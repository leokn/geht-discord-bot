// $ID: Module.js, 12 Jan 2018, 17:00, Leonid 'n3o' Knyazev $

import Events from 'events';

class Module extends Events {
    /**
     * @constructor
     */
    constructor(bot, params) {
        super();

        this.bot = bot;
        this.params = params;
    }
}

export default Module;
