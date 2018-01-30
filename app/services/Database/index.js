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

        // await migrate('up', {
        //     cwd: './',
        //     knexfile: './data/config/knex/default.js'
        // }, ({ action, migration }) => {
        //     this.bot.log.info(`Doing ${action} on ${migration}`);
        // });
    }


    /**
     * @override
     */
    async start() {
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
