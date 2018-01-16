// $ID: index.js, 16 Jan 2018, 17:18, Leonid 'n3o' Knyazev $

import Events from 'events';

import plugins from '../../plugins';

class Plugins extends Events {
    /**
     * @constructor
     */
    constructor(bot) {
        super();

        this.bot = bot;
        this.logger = bot.logger;

        this.plugins = {};
    }


    /**
     * @register
     */
    register(plugin) {
        const {id, name, enabled, commands, params} = plugin;

        this.logger.info(`Loading '${name}' plugin...`);

        if (!plugins[id]) {
            this.logger.error(`Loading '${name}' plugin failed. Plugin not found.`);
        } else if (!enabled) {
            this.logger.warn(`Loading '${name}' plugin stopped. Plugin is disabled.`);
        } else {
            this.plugins[id] = new plugins[id](this.bot, params);

            if (commands) {
                this.logger.info(`Registering '${name}' plugin commands...`);

                commands.map(command => this.bot.commands.register(command, this.plugins[id]));
            }
        }
    }
}

export default Plugins;
