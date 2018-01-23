// $ID: index.js, 23 Jan 2018, 15:06, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

class Error extends Event {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'error',
            types: [Constants.Events.ERROR]
        });
    }
}

export default new Error();
