// $ID: index.js, 23 Jan 2018, 15:13, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

class WarnEvent extends Event {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'warn',
            types: [Constants.Events.WARN]
        });
    }
}

export default new WarnEvent();
