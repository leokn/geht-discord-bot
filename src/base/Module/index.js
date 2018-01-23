// $ID: Module.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

class Module {
    /**
     * @constructor
     */
    constructor() {
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
    async start() {}
}

export default Module;
