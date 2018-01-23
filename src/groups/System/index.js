// $ID: System.js, 22 Jan 2018, 21:14, Leonid 'n3o' Knyazev $

import { Group } from 'patron.js';

class System extends Group {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'system',
            description: 'System commands to explain stuff, etc.'
        });
    }
}

export default new System();
