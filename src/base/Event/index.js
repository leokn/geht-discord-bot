// $ID: index.js, 23 Jan 2018, 12:26, Leonid 'n3o' Knyazev $

class Event {
    /**
     * @constructor
     */
    constructor(event = {}) {
        /**
         * Event name.
         * @type {string}
         * @readonly
         */
        Object.defineProperty(this, 'name', {
            value: event.name
        });

        /**
         * Events types.
         * @type {array|string}
         * @readonly
         */
        Object.defineProperty(this, 'types', {
            value: event.types
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
    async register(bot = null, params = {}) {
        if (!bot) {
            throw new Error('You must pass the Bot instance to the register method.');
        }

        this.bot = bot;
        this.params = params;

        if (this.bot.debug) {
            this.bot.log.info(`[bot] Registering [${this.name}] event...`);
        }

        this.types.forEach(type => {
            this.bot.on(type, this.handler.bind(this));
        });
    }


    /**
     * @handler
     */
    async handler() {}
}

export default Event;
