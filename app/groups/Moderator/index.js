// $ID: index.js, 24 Jan 2018, 13:09, Leonid 'n3o' Knyazev $

import { Group } from '../../base';

class Moderator extends Group {
    constructor() {
        super({
            name: 'moderator',
            description: 'Moderator bot commands.'
        });
    }
}

export default new Moderator();
