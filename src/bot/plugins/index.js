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
        const {id, name, commands} = plugin;

        this.logger.info(`Loading '${name}' plugin...`);

        if (!plugins[id]) {
            this.logger.error(`Loading '${name}' plugin failed (not found).`)
        } else {
            this.plugins[id] = plugin;

            if (commands) {
                commands.map(command => this.bot.commands.register(command, id));
            }
        }
    }
}

export default Plugins;
