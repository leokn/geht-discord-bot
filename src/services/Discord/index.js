// $ID: index.js, 23 Jan 2018, 13:32, Leonid 'n3o' Knyazev $

import { Service } from '../../base';

import Events from '../../events';

class Discord extends Service {
    /**
     * @override
     */
    constructor() {
        super({
            id: 'discord',
            name: 'Discord'
        });
    }


    /**
     * @override
     */
    async configure() {
        await super.configure(this.bot.config.get('services.discord'));

        // Registering Discord events...
        Object.keys(Events).forEach(name => Events[name].register(this.bot, this.params));

        return this;
    }
}

export default new Discord();
