// $ID: index.js, 22 Jan 2018, 20:17, Leonid 'n3o' Knyazev $

import { Service } from '../../base';

import redis from 'redis';
import bluebird from 'bluebird';

class RedisService extends Service {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'Redis',
            description: 'Redis Service.',
            provides: ['cache']
        });
    }


    /**
     * @override
     */
    async configure() {
        this.params = this.bot.config.get('redis');

        // Promisifying redis...
        bluebird.promisifyAll(redis.RedisClient.prototype);
        bluebird.promisifyAll(redis.Multi.prototype);
    }


    /**
     * @override
     */
    async start() {
        // database connections pool...
        this.redis = redis.createClient(this.params.port, this.params.host);

        this.redis.on('error', (error) => {
            throw new Error(error);
        });

        this.redis.quit();
    }


    /**
     * @override
     */
    provide() {
        return this.redis;
    }
}

export default new RedisService();
