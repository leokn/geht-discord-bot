// $ID: Module.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

import Events from 'events';

class Module extends Events {
    /**
     * @constructor
     */
    constructor(module = {}) {
        super();

        /**
         * Module name.
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, 'name', {
            value: module.name
        });

        /**
         * Module description.
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, 'description', {
            value: module.description
        });

        /**
         * Service params.
         * @type {object}
         */
        this.params = {};
    }


    /**
     * @register
     */
    async register(bot = null, log = null, config = null) {
        // Register Bot instance.
        Object.defineProperty(this, 'bot', {
            value: bot
        });

        // Register Logger instance.
        Object.defineProperty(this, 'log', {
            value: log
        });

        // Register Config instance.
        Object.defineProperty(this, 'config', {
            value: config
        });

        if (this.log !== null) {
            this.log.info(`Loading [${this.name}] module...`);
        }
    }


    /**
     * @configure
     */
    async configure(params = {}) {
        Object.assign(this.params, params);
    }


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
