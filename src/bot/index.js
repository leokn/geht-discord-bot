// $ID: index.js, 12 Jan 2018, 14:51, Leonid 'n3o' Knyazev $

import Config from './config';
import Logger from './logger';

import Modules from './modules';

class Bot {
    /**
     * @constructor
     */
    constructor() {
        this.log = new Logger();
        this.config = new Config();

        this.modules = new Modules(this);
    }


    /**
     * @init
     */
    async init() {
        this.log.section('Init...');

        // Check configuration
        await this.config.check(this);
    }


    /**
     * @load
     */
    async load() {
        this.log.section('Loading...');

        await this.modules.load();
    }


    /**
     * @start
     */
    async start() {
        // print environment mode
        if (process.env.NODE_ENV === 'production') {
            this.log.print(' Production mode ', 'whiteBright', 'bgGreen');
            this.log.print('');
        } else {
            this.log.print(' Development mode ', 'whiteBright', 'bgRed');
            this.log.print('');
        }

        // initializing and loading...
        await this.init();
        await this.load();

        // starting
        this.log.section('Staring...');

        return 'Started.';
    }
}

export default new Bot();
