// $ID: index.js, 22 Jan 2018, 20:17, Leonid 'n3o' Knyazev $

import redis from 'redis';
import bluebird from 'bluebird';
import { Service } from '../../base';

class RedisService extends Service {
    constructor() {
        super({
            name: 'Redis',
            description: 'Redis Service.',
            provides: ['cache']
        });
    }

    async configure(params = {}) {
        if (this.config.has('redis')) {
            Object.assign(params, this.config.get('redis'));
        }

        await super.configure(params);

        // Promisifying redis...
        bluebird.promisifyAll(redis.RedisClient.prototype);
        bluebird.promisifyAll(redis.Multi.prototype);
    }

    async start() {
        // Redis client.
        this.redis = redis.createClient(this.params.port, this.params.host);

        this.redis.on('error', error => this.log.error(error));
    }

    provide() {
        return this.redis;
    }
}

export default new RedisService();
