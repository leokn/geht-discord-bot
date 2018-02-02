// $ID: Plugin.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

import Events from 'events';

class Plugin extends Events {
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
         * Plugin params.
         * @type {Object}
         * @readonly
         */
        Object.defineProperty(this, 'params', {
            value: params
        });
    }
}

export default Plugin;
