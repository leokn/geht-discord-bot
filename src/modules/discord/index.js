// $ID: index.js, 12 Jan 2018, 16:58, Leonid 'n3o' Knyazev $

import Module from '../../types/module';

import Parser from './parser';
import { Client, Constants } from 'discord.js';

class Discord extends Module {
    /**
     * @constructor
     */
    constructor() {
        super(...arguments);

        this.config = this.bot.config;

        this.client = new Client();
        this.events = Constants.Events;

        this.parser = new Parser(this.client, this.config);
    }


    /**
     * @start
     */
    start() {
        this.client.on(this.events.READY, () => {
            this.emit('started');
        });

        this.client.on(this.events.MESSAGE_CREATE, this.onMessage.bind(this));
        this.client.on(this.events.MESSAGE_UPDATE, this.onMessage.bind(this));

        this.client.on(this.events.DISCONNECT, this.onDisconnect.bind(this));

        return this.connect();
    }


    /**
     * @connect
     */
    connect() {
        this.bot.logger.info('Connection to Discord server...');

        const token = this.config.get('bot.token');

        return this.client.login(token);
    }


    /**
     * @onMessage
     */
    onMessage(input) {
        this.parser.parse(input)
            .then(command => this.emit('command', command))
            .catch(message => this.emit('message', message));
    }


    /**
     * @onDisconnect
     */
    onDisconnect() {
        this.bot.logger.warn('Disconnected. Attempting to reconnect in 20 seconds...', 'client');

        setTimeout(this.connect, 20000);

    }
}

export default Discord;
