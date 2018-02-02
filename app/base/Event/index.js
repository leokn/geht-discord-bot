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
        Object.defineProperty(this, 'events', {
            value: event.events
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
    async register(bot = null, log = null, config = null, params = {}) {
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

        // Configuring...
        Object.assign(params, this.params);
        Object.assign(this.params, params);

        // Registering event handler in Discord client.
        this.events.forEach(event => {
            this.bot.on(event, this.handler.bind(this));
        });
    }


    /**
     * @handler
     */
    async handler() {}
}

export default Event;
