// $ID: index.js, 16 Jan 2018, 17:19, Leonid 'n3o' Knyazev $

import Events from 'events';

class Commands extends Events {
    /**
     * @constructor
     */
    constructor() {
        super();

        this.commands = {};
    }


    /**
     * @register
     */
    register(command, handler) {
        this.commands[command] = handler;
    }
}

export default Commands;
