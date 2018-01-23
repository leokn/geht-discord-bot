// $ID: Module.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

import Events from 'events';

class Module extends Events {
    /**
     * @constructor
     */
    constructor(bot, params) {
        super();

        /**
         * The Bot instance.
         * @type {Bot}
         * @readonly
         */
        Object.defineProperty(this, 'bot', {
            value: bot
        });

        /**
         * Module params.
         * @type {Object}
         * @readonly
         */
        Object.defineProperty(this, 'params', {
            value: params
        });
    }


    /**
     * @init
     */
    async init() {}
}

export default Module;
