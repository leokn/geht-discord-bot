// $ID: index.js, 24 Jan 2018, 13:09, Leonid 'n3o' Knyazev $

import { Group } from '../../base';

class Developer extends Group {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'developer',
            description: 'Developer bot commands.'
        });
    }
}

export default new Developer();
