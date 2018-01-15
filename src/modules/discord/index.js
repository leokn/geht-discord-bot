// $ID: index.js, 12 Jan 2018, 16:58, Leonid 'n3o' Knyazev $

import Parser from './parser';
import { Constants, Client } from 'discord.js';

import Module from '../module';

class Discord extends Module {
    /**
     * @constructor
     */
    constructor(bot, params) {
        super(bot, params);

        this.client = new Client();
        this.parser = new Parser(this.client, this.bot.config);
    }


    /**
     * @start
     */
    start() {
        this.bot.logger.info('Starting Discord client...');

        return new Promise(resolve => {
            this.client.on(Constants.Events.READY, () => {
                this.bot.logger.info('Client for Discord server ready...');

                return resolve();
            });

            this.client.on(Constants.Events.MESSAGE_CREATE, this.onMessage.bind(this));
            this.client.on(Constants.Events.MESSAGE_UPDATE, this.onMessage.bind(this));

            this.client.on(Constants.Events.DISCONNECT, this.onDisconnect.bind(this));

            this.connect();
        });
    }


    /**
     * connect
     */
    connect() {
        this.bot.logger.info('Connection to Discord server...');

        this.client.login(this.bot.config.get('bot.token'));
    }


    /**
     * @onMessage
     */
    onMessage(message) {
        this.bot.logger.info('Receiving massage...', 'message');

        this.parser.parse(message)
            .then(command => this.bot.handle(command))
            .catch(error => this.bot.logger.info(error, 'message'));
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
