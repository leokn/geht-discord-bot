// $ID: index.js, 23 Jan 2018, 13:32, Leonid 'n3o' Knyazev $

import { Module } from '../../base';

import Events from '../../events';

class EventsModule extends Module {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'events',
            description: 'Discord Events Service.'
        });
    }


    /**
     * @override
     */
    async configure(params = {}) {
        if (this.bot.config.has('discord')) {
            Object.assign(params, this.bot.config.get('discord'));
        }

        if (this.bot.config.has('commands')) {
            Object.assign(params, this.bot.config.get('commands'));
        }

        Object.assign(this.params, params);
    }


    /**
     * @override
     */
    async start() {
        // Registering Discord Events...
        Object.keys(Events).forEach(name => Events[name].register(this.bot, this.params));
    }
}

export default new EventsModule();
