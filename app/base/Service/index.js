// $ID: Service.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

import Events from 'events';

class Service extends Events {
    /**
     * @constructor
     */
    constructor(service = {}) {
        super();

        /**
         * Service name.
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, 'name', {
            value: service.name
        });

        /**
         * Service description.
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, 'description', {
            value: service.description
        });

        /**
         * Service provides.
         * @type {Array}
         * @readonly
         */
        Object.defineProperty(this, 'provides', {
            value: service.provides
        });

        /**
         * Params.
         * @type {object}
         */
        this.params = {};
    }


    /**
     * @register
     */
    async register(log = null, config = null, bot = null) {
        // Register Logger instance.
        Object.assign(this, 'log', {
            value: log
        });

        // Register Config instance.
        Object.assign(this, 'config', {
            value: config
        });

        // Register Bot instance.
        Object.assign(this, 'bot', {
            value: bot
        });

        if (this.log !== null) {
            this.log.info(`Loading [${this.name}] service...`);
        }
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
     * @stop
     */
    async stop() {}


    /**
     * @provide
     */
    provide() {
        return this;
    }
}

export default Service;
