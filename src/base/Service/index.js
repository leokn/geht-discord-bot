// $ID: Service.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

class Service {
    /**
     * @constructor
     */
    constructor(service = {}) {
        /**
         * Service id.
         * @type {string}
         * @readonly
         */
        Object.defineProperty(this, 'id', {
            value: service.id
        });

        /**
         * Service name.
         * @type {string}
         * @readonly
         */
        Object.defineProperty(this, 'name', {
            value: service.name
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

        this.bot = bot;

        if (this.bot.debug) {
            this.bot.log.info(`[bot] Registering [${this.name}] service...`);
        }

        return await this.configure();
    }


    /**
     * @configure
     */
    async configure(params = {}) {
        this.params = params;

        return this;
    }


    /**
     * @start
     */
    async start() {
        return this;
    }
}

export default Service;
