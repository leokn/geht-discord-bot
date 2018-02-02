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
    async configure(params = {}) {
        if (this.config.has('database')) {
            Object.assign(params, this.config.get('database'));
        }

        await super.configure(params);
    }


    /**
     * @override
     */
    async start() {
        // Database connections pool.
        this.database = knex({
            pool: this.params.pool,
            client: this.params.client,
            connection: this.params.connection
        });

        // Run migrations and seeds
        await new Promise(resolve => {
            this.database.migrate.latest(this.params.migrations)
                .then(() => this.database.seed.run(this.params.seeds))
                .then(() => resolve());
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
