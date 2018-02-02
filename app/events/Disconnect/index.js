// $ID: index.js, 23 Jan 2018, 15:15, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

class DisconnectEvent extends Event {
    constructor() {
        super({
            name: 'disconnect',
            events: [Constants.Events.DISCONNECT]
        });
    }
}

export default new DisconnectEvent();
