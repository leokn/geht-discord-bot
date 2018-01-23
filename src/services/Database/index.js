// $ID: index.js, 22 Jan 2018, 20:05, Leonid 'n3o' Knyazev $

import { Service } from '../../types';

class Database extends Service {
    /**
     * @check
     */
    async check() {
        this.bot.log.info('Checking [Database] service...');

        return new Promise(resolve => {
            setTimeout(() => resolve(), 100);
        });
    }
}

export default Database;
