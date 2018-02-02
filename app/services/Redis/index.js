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
    async configure(params = {}) {
        if (this.config.has('redis')) {
            Object.assign(params, this.config.get('redis'));
        }

        await super.configure(params);

        // Promisifying redis...
        bluebird.promisifyAll(redis.RedisClient.prototype);
        bluebird.promisifyAll(redis.Multi.prototype);
    }


    /**
     * @override
     */
    async start() {
        // Redis client.
        this.redis = redis.createClient(this.params.port, this.params.host);

        this.redis.on('error', error => this.log.error(error));
    }


    /**
     * @override
     */
    provide() {
        return this.redis;
    }
}

export default new RedisService();
