// $ID: Module.js, 22 Jan 2018, 15:10, Leonid 'n3o' Knyazev $

class Module {
    /**
     * @constructor
     */
    constructor(service = {}) {
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
         * Module provides.
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
        this.bot = bot;

        return this;
    }


    /**
     * @configure
     */
    async configure() {}


    /**
     * @start
     */
    start() {}


    /**
     * @stop
     */
    stop() {}


    /**
     * @provide
     */
    provide() {
        return this;
    }
}

export default Module;
