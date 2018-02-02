// $ID: index.js, 12 Jan 2018, 14:51, Leonid 'n3o' Knyazev $

import { Config, Logger } from './utils';
import { Client, Registry, Handler } from './base';

import Modules from './modules';
import Plugins from './plugins';
import Services from './services';

class Bot extends Client {
    constructor() {
        super();

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

    async init() {
        this.log.info('Init...', { section: true });

        // Checking configuration...
        await this.config.check(this);

        // Registering Default TypeReaders in Registry...
        this.registry.registerDefaultTypeReaders();
    }

    async load() {
        this.log.info('Loading...', { section: true });

        // Loading services...
        const services = await new Promise(resolve => {
            this.log.info('Loading services...');

            Object.keys(Services).forEach(async (name) => {
                const service = Services[name];

                await service.register(this, this.log, this.config);
                await service.configure();
                await service.start();

                if (service.provides && Array.isArray(service.provides)) {
                    service.provides.forEach(id => {
                        this[id] = service.provide();
                    });
                }

                return resolve();
            });
        });

        // Loading modules...
        const modules = await new Promise(resolve => {
            this.log.info('Loading modules...');

            Object.keys(Modules).forEach(async (name) => {
                const module = Modules[name];

                await module.register(this, this.log, this.config);
                await module.configure();
                await module.start();

                this.modules[module.name] = module.provide();

                return resolve();
            });
        });

        // Loading plugins...
        const plugins = await new Promise(resolve => {
            this.log.info('Loading plugins...');

            Object.keys(Plugins).forEach(() => {});

            return resolve();
        });

        await Promise.all([services, modules, plugins]);
    }

    async start() {
        this.log.banner(this);

        await this.init();
        await this.load();

        this.log.info('Starting...', { section: true });

        await this.connect();
    }

    async connect() {
        await this.login(this.config.get('token'));

        this.log.info('Started.', { success: true });
    }

    service(id) {
        return this[id];
    }

    module(id) {
        return this.modules[id];
    }
}

export default new Bot();
