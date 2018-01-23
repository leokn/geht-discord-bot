// $ID: Service.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

import Events from 'events';

class Service extends Events {
    /**
     * @constructor
     */
    constructor(bot) {
        super();

        /**
         * The Bot instance.
         * @type {Bot}
         * @readonly
         */
        Object.defineProperty(this, 'bot', {
            value: bot
        });
    }
}

export default Service;
