// $ID: Service.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

class Service {
    /**
     * @constructor
     */
    constructor(service = {}) {
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
        if (!bot) {
            throw new Error('You must pass the Bot instance to the service start method.');
        }

        // Bot instance.
        this.bot = bot;

        // Export service provides...
        if (this.provides && Array.isArray(this.provides)) {
            this.provides.forEach(async (id) => {
                this.bot.services[id] = await this.provide();
            });
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
    async provide() {
        return this;
    }
}

export default Service;
