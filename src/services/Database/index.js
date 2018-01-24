// $ID: index.js, 22 Jan 2018, 20:05, Leonid 'n3o' Knyazev $

import { Service } from '../../base';

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
}

export default new DatabaseService();
