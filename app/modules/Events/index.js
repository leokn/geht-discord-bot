// $ID: index.js, 23 Jan 2018, 13:32, Leonid 'n3o' Knyazev $

import { Module } from '../../base';
import Events from '../../events';

class EventsModule extends Module {
    constructor() {
        super({
            name: 'events',
            description: 'Discord Events Service.'
        });
    }

    async configure(params = {}) {
        if (this.config.has('discord')) {
            Object.assign(params, this.config.get('discord'));
        }

        if (this.config.has('commands')) {
            Object.assign(params, this.config.get('commands'));
        }

        await super.configure(params);
    }

    async start() {
        // Registering Discord Events...
        Object.keys(Events).forEach(name => Events[name].register(this.bot, this.log, this.config, this.params));
    }
}

export default new EventsModule();
