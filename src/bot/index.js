// $ID: index.js, 12 Jan 2018, 14:51, Leonid 'n3o' Knyazev $

import Events from 'events';

import Config from './config';
import Logger from './logger';

import Modules from './modules';
import Plugins from './plugins';
import Commands from './commands';

class Bot extends Events {
    /**
     * @constructor
     */
    constructor() {
        super();

        this.config = new Config();
        this.logger = new Logger();

        this.modules  = new Modules(this);
        this.plugins  = new Plugins(this);
        this.commands = new Commands();
    }


    /**
     * @init
     */
    init() {
        return new Promise((resolve, reject) => {
            // print environment mode
            if (process.env.NODE_ENV === 'production') {
                this.logger.print(' Production mode ', 'whiteBright', 'bgGreen');
                this.logger.print('');
            } else {
                this.logger.print(' Development mode ', 'whiteBright', 'bgRed');
                this.logger.print('');
            }

            this.logger.info('Starting...');

            return this.configure()
                .then(() => this.load())
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    /**
     * @configure
     */
    configure() {
        return new Promise((resolve, reject) => {
            this.logger.section('Checking config...');

            this.config.check()
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    /**
     * @loading
     */
    load() {
        return new Promise(resolve => {
            // Loading modules...
            const modules = this.config.get('modules');

            this.logger.section('Loading modules...');

            if (!Array.isArray(modules) || modules.length === 0) {
                this.logger.warn('No modules to load.');
            } else {
                modules.forEach(module => {
                    this.modules.register(module);
                });
            }


            // Loading plugins...
            const plugins = this.config.get('plugins');

            this.logger.section('Loading plugins...');

            if (!Array.isArray(plugins) || plugins.length === 0) {
                this.logger.warn('No plugins to load.');
            } else {
                plugins.forEach(plugin => {
                    this.plugins.register(plugin);
                });
            }

            return resolve();
        });
    }


    /**
     * @start
     */
    start() {
        return new Promise((resolve, reject) => {
            this.logger.section('Starting Discord client...');

            const discord = this.modules.get('discord');

            if (!discord) {
                return reject('Module \'Discord\' not found.');
            }

            discord.on('started', () => resolve('Started.'));

            return discord.start();
        });
    }
}

export default new Bot();
