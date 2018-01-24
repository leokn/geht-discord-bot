// $ID: index.js, 23 Jan 2018, 13:32, Leonid 'n3o' Knyazev $

import { Service } from '../../base';

import Events from '../../events';

class EventsService extends Service {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'Events',
            description: 'Discord Events Service.'
        });
    }


    /**
     * @override
     */
    async configure() {
        this.params = this.bot.config.get('discord');
    }


    /**
     * @override
     */
    start() {
        // Registering Discord Events...
        Object.keys(Events).forEach(name => Events[name].register(this.bot, this.params));
    }
}

export default new EventsService();
