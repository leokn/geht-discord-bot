// $ID: index.js, 23 Jan 2018, 15:16, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

class ReconnectEvent extends Event {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'reconnect',
            events: [Constants.Events.RECONNECT]
        });
    }
}

export default new ReconnectEvent();
