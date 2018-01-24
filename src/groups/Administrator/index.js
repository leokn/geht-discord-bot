// $ID: index.js, 24 Jan 2018, 13:09, Leonid 'n3o' Knyazev $

import { Group } from '../../base';

class Administrator extends Group {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'administrator',
            description: 'Administrator bot commands.'
        });
    }
}

export default new Administrator();
