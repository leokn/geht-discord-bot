// $ID: index.js, 22 Jan 2018, 20:05, Leonid 'n3o' Knyazev $

import { Service } from '../../base';

class Database extends Service {
    /**
     * @override
     */
    constructor() {
        super({
            id: 'db',
            name: 'Database'
        });
    }


    /**
     * @override
     */
    async configure() {
        await super.configure(this.bot.config.get('services.database'));

        return this;
    }
}

export default new Database();
