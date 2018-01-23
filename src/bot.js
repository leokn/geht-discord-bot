// $ID: index.js, 12 Jan 2018, 14:51, Leonid 'n3o' Knyazev $

import { Client, Registry, Handler } from './base';
import { Config, Logger } from './utils';

import Services from './services';
import Modules from './modules';

class Bot extends Client {
    /**
     * @constructor
     */
    constructor() {
        super();

        /**
         * Debug flag.
         * @type {Boolean}
         * @readonly
         */
        Object.defineProperty(this, 'debug', {
            value: process.env.NODE_ENV !== 'production' || process.env.DEBUG === 'true'
        });

        /**
         * Logger instance.
         * @type {Logger}
         * @readonly
         */
        Object.defineProperty(this, 'log', {
            value: new Logger()
        });

        /**
         * Config instance.
         * @type {Config}
         * @readonly
         */
        Object.defineProperty(this, 'config', {
            value: new Config()
        });

        /**
         * Registry instance.
         * @type {Registry}
         * @readonly
         */
        Object.defineProperty(this, 'registry', {
            value: new Registry()
        });

        /**
         * Handler instance.
         * @type {Handler}
         * @readonly
         */
        Object.defineProperty(this, 'handler', {
            value: new Handler(this.registry)
        });

        /**
         * Services.
         * @type {Object}
         */
        this.services = {};
    }


    /**
     * @init
     */
    async init() {
        this.log.info('[bot] Init...', { section: true });

        // Checking configuration...
        await this.config.check(this);

        // Registering Default TypeReaders in Registry...
        this.registry.registerDefaultTypeReaders();
    }


    /**
     * @load
     */
    async load() {
        this.log.info('[bot] Loading...', { section: true });

        // Loading services...
        Object.keys(Services).forEach(async (name) => {
            await Services[name].register(this)
                .then(async (service) => this.services[service.id] = await service.start());
        });

        // Loading modules...
        Object.keys(Modules).forEach(async (name) => {
            await Modules[name].register(this)
                .then(module => module.start());
        });
    }


    /**
     * @connect
     */
    async connect() {
        this.log.info('[bot] Connecting...');

        return await this.login(this.config.get('token'));
    }


    /**
     * @start
     */
    async start() {
        this.log.banner(this);

        await this.init();
        await this.load();

        this.log.info('[bot] Starting...', { section: true });

        await this.connect();

        this.log.info('[bot] Started.', { success: true });
    }


    /**
     * @service
     */
    service(id) {
        return this.services[id];
    }
}


export default new Bot();
