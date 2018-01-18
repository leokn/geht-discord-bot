// $ID: index.js, 12 Jan 2018, 14:51, Leonid 'n3o' Knyazev $

import Events from 'events';

import Config from './config';
import Logger from './logger';
import Modules from './modules';

class Bot extends Events {
    /**
     * @constructor
     */
    constructor() {
        super();

        this.log = new Logger();

        this.config = new Config();

        /**
         * Bot name.
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, 'name', {
            value: this.config.get('bot.name')
        });

        /**
         * Bot version.
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, 'version', {
            value: this.config.get('bot.version')
        });

        // modules manager
        this.modules = new Modules(this);
    }


    /**
     * @init
     */
    async init() {
        this.log.section('Init...');

        // checking configuration
        await this.config.check(this);
    }


    /**
     * @load
     */
    async load() {
        this.log.section('Loading...');

        // loading modules
        await this.modules.load();

        // loading plugins
        this.log.section('Loading plugins...');
    }


    /**
     * @start
     */
    async start() {
        // print bot banner
        await this.log.banner(this);

        // initializing and loading...
        await this.init();
        await this.load();

        // starting
        this.log.section('Staring...');

        // connecting discord client
        return await this.modules.get('discord').connect();
    }
}

export default new Bot();
