// $ID: index.js, 22 Jan 2018, 20:05, Leonid 'n3o' Knyazev $

import { Service } from '../../base';

import knex from 'knex';

class DatabaseService extends Service {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'Database',
            description: 'Database Service.',
            provides: ['db']
        });
    }


    /**
     * @override
     */
    async configure() {
        this.params = this.bot.config.get('database');
    }


    /**
     * @override
     */
    start() {
        // database connections pool...
        this.database = knex({
            pool: this.params.pool,
            client: this.params.client,
            connection: this.params.connection
        });
    }


    /**
     * @override
     */
    provide() {
        return this.database;
    }
}

export default new DatabaseService();
