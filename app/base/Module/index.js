// $ID: Module.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

import Events from 'events';

class Module extends Events {
    /**
     * @constructor
     */
    constructor(service = {}) {
        super();

        /**
         * Module name.
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, 'name', {
            value: service.name
        });

        /**
         * Module description.
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, 'description', {
            value: service.description
        });

        /**
         * Bot instance.
         * @type {Bot}
         */
        this.bot = null;

        /**
         * Service params.
         * @type {object}
         */
        this.params = {};
    }


    /**
     * @register
     */
    async register(bot = null) {
        this.bot = bot;
    }


    /**
     * @configure
     */
    async configure() {}


    /**
     * @start
     */
    async start() {}


    /**
     * @provide
     */
    provide() {
        return this;
    }
}

export default Module;
