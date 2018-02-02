// $ID: index.js, 23 Jan 2018, 15:06, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

class ErrorEvent extends Event {
    constructor() {
        super({
            name: 'error',
            events: [Constants.Events.ERROR]
        });
    }
}

export default new ErrorEvent();
