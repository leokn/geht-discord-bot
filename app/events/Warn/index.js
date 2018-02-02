// $ID: index.js, 23 Jan 2018, 15:13, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

class WarnEvent extends Event {
    constructor() {
        super({
            name: 'warn',
            events: [Constants.Events.WARN]
        });
    }
}

export default new WarnEvent();
