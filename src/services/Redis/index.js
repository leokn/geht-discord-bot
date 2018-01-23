// $ID: index.js, 22 Jan 2018, 20:17, Leonid 'n3o' Knyazev $

import { Service } from '../../base';

class Redis extends Service {
    /**
     * @override
     */
    constructor() {
        super({
            id: 'redis',
            name: 'Redis'
        });
    }


    /**
     * @override
     */
    async configure() {
        await super.configure(this.bot.config.get('services.redis'));

        return this;
    }
}

export default new Redis();
