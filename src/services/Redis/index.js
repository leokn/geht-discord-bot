// $ID: index.js, 22 Jan 2018, 20:17, Leonid 'n3o' Knyazev $

import { Service } from '../../types';

class Redis extends Service {
    /**
     * @check
     */
    async check() {
        this.bot.log.info('Checking [Redis] service...');

        return new Promise(resolve => {
            setTimeout(() => resolve(), 100);
        });
    }
}

export default Redis;
