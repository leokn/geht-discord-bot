// $ID: discord.js.js, 17 Jan 2018, 13:48, Leonid 'n3o' Knyazev $

import { Module } from '../../types';
import { Client, Constants } from 'discord.js';

class Discord extends Module {
    /**
     * @override
     */
    constructor(bot, params) {
        super(bot, params);

        /**
         * discord.js client instance.
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', {
            value: new Client()
        });

        /**
         * Bot token.
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, 'token', {
            value: bot.config.get('bot.token')
        });

        /**
         * discord.js events
         * @type {Object}
         */
        this.Events = Constants.Events;
    }


    /**
     * @override
     */
    async init() {
        // onReady
        this.client.on(this.Events.READY, () => this.bot.emit('ready'));

        // onMessages
        this.client.on(this.Events.MESSAGE_CREATE, (event) => this.bot.emit('message', event));
        this.client.on(this.Events.MESSAGE_UPDATE, (event) => this.bot.emit('message', event));

        // onDisconnect
        this.client.on(this.Events.DISCONNECT, () => {
            this.bot.log.error('Disconnected.', 'client');

            const {reconnect: {timeout: timeout = false} = {}} = this.params;

            if (timeout) {
                this.bot.log.warn(`Attempting to reconnect in ${timeout} seconds...`, 'client');
                setTimeout(async () => await this.connect(), (timeout * 1000));
            }
        });
    }


    /**
     * @connect
     */
    async connect() {
        this.bot.log.info('Connecting to Discord server...');

        await this.client.login(this.token);

        // Fix mobile notifications
        await this.client.user.setAFK(true);

        return `Started: ${this.client.user.username}#${this.client.user.discriminator} <ID: ${this.client.user.id}>`;
    }
}

export default Discord;
