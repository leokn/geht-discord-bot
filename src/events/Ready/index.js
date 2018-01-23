// $ID: index.js, 23 Jan 2018, 14:11, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

class Ready extends Event {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'ready',
            types: [Constants.Events.READY]
        });
    }
}

export default new Ready();
