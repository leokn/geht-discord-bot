// $ID: index.js, 22 Jan 2018, 20:17, Leonid 'n3o' Knyazev $

import { Service } from '../../base';

class RedisService extends Service {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'Redis',
            description: 'Redis Service.',
            provides: ['redis']
        });
    }


    /**
     * @override
     */
    async configure() {
        this.params = this.bot.config.get('redis');
    }
}

export default new RedisService();
