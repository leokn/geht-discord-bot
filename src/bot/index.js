// $ID: index.js, 12 Jan 2018, 14:51, Leonid 'n3o' Knyazev $

import Logger from '../logger';
import Config from '../config';

class Bot {
    /**
     * @constructor
     */
    constructor() {
        this.logger = new Logger();
        this.config = new Config();

        this.modules = {};
        this.commands = {};

        // print environment mode
        if (process.env.NODE_ENV === 'production') {
            this.logger.print(' Production mode ', 'whiteBright', 'bgGreen');
            this.logger.print('');
        } else {
            this.logger.print(' Development mode ', 'whiteBright', 'bgRed');
            this.logger.print('');
        }
    }


    /**
     * @init
     */
    init() {
        this.logger.info('Init...');

        return new Promise((resolve, reject) => {
            this.configure()
                .then(() => this.loading())
                .then(() => this.start())
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    /**
     * @configure
     */
    configure() {
        this.logger.info('Configuring...');

        return new Promise((resolve, reject) => {
            this.config.check(this)
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }


    /**
     * @loading
     */
    loading() {
        this.logger.info('Loading modules...');

        return new Promise(resolve => {
            // TODO: написать загрузку модулей
            const Discord = require('../modules/discord/').default; // eslint-disable-line global-require

            this.modules['discord'] = new Discord(this, {});

            // const modules = this.config.get('modules');

            // modules.forEach(module => {
            //     this.logger.info(`Loading '${module.name}' module...`);
            // });

            // Object.keys(modules).forEach(name => {
            //     this.logger.info(`Loading '${name}' module...`);
            //
            //     const module = require(`../modules/${name}/`).default; // eslint-disable-line global-require
            //     const params = modules[name] || {};
            //
            //     this.modules[name] = new module(this, params);
            // });

            return resolve();
        });
    }


    /**
     * @start
     */
    start() {
        return this.modules.discord.start();
    }


    /**
     * @handle
     */
    handle(command) {
        // TODO: дописать обработку комманд.

        console.log('HANDLED: ', command);
    }
}

export default Bot;
