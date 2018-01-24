// $ID: index.js, 12 Jan 2018, 14:51, Leonid 'n3o' Knyazev $

import { Config, Logger } from './utils';
import { Client, Registry, Handler } from './base';

import Services from './services';
import Modules from './modules';
import Plugins from './plugins';

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
         * Modules.
         * @type {Object}
         */
        this.modules = {};

        /**
         * Plugins.
         * @type {Object}
         */
        this.plugins ={};
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
        const services = new Promise(resolve => {
            if (this.debug) {
                this.log.info('[bot] Loading services...');
            }

            Object.keys(Services).forEach(name => {
                const service = Services[name];

                service.register(this);

                service.configure().then(() => {
                    service.start();

                    if (service.provides && Array.isArray(service.provides)) {
                        service.provides.forEach(id => {
                            if (this[id]) {
                                throw new Error(`[${id}] already registered. Choose another providers for [${name}] service.`);
                            }

                            this[id] = service.provide();
                        });
                    }

                    return resolve();
                });
            });
        });

        // Loading modules...
        const modules = new Promise(resolve => {
            if (this.debug) {
                this.log.info('[bot] Loading modules...');
            }

            Object.keys(Modules).forEach(name => {
                const module = Modules[name];

                module.register(this);

                module.configure().then(() => {
                    module.start();

                    if (module.provides && Array.isArray(module.provides)) {
                        module.provides.forEach(id => {
                            if (this.modules[id]) {
                                throw new Error(`Module [${id}] already registered. Choose another providers for [${name}] module.`);
                            }

                            this.modules[id] = module.provide();
                        });
                    }

                    return resolve();
                });
            });

            return resolve();
        });

        // Loading plugins...
        const plugins = new Promise(resolve => {
            if (this.debug) {
                this.log.info('[bot] Loading plugins...');
            }

            // TODO: Implement plugin loader
            Object.keys(Plugins).forEach(async () => {});

            return resolve();
        });

        return new Promise(resolve => {
            Promise.all([services, modules, plugins]).then(() => resolve());
        });
    }


    /**
     * @start
     */
    async start() {
        this.log.banner(this);

        await this.init();
        await this.load();

        this.log.info('[bot] Starting...', { section: true });

        await this.connect().then(() => {
            this.log.info('[bot] Connected.', { success: true });
            this.log.info('[bot] Started.', { success: true });
        });
    }


    /**
     * @connect
     */
    async connect() {
        this.log.info('[bot] Connecting...', { section: true });

        return await this.login(this.config.get('token'));
    }


    /**
     * @service
     */
    service(id) {
        return this[id];
    }


    /**
     * @module
     */
    module(id) {
        return this.modules[id];
    }
}


export default new Bot();
