// $ID: index.js, 23 Jan 2018, 10:57, Leonid 'n3o' Knyazev $

import { Group } from 'patron.js';

class Main extends Group {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'main',
            description: 'Main bot commands.'
        });
    }
}

export default new Main();
