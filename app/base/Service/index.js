// $ID: Service.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

import Events from 'events';

class Service extends Events {
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
            this.log.info(`Loading [${this.name}] service...`);
        }
    }

    async configure(params = {}) {
        Object.assign(this.params, params);
    }

    async start() {}

    provide() {
        return this;
    }
}

export default Service;
