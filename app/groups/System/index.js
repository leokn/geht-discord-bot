// $ID: System.js, 22 Jan 2018, 21:14, Leonid 'n3o' Knyazev $

import { Group } from '../../base';

class System extends Group {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'system',
            description: 'System bot commands.'
        });
    }
}

export default new System();
