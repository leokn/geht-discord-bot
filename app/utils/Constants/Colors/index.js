// $ID: index.js, 23 Jan 2018, 13:03, Leonid 'n3o' Knyazev $

import { Constants } from 'discord.js';

class Colors {
    constructor() {
        Object.assign(this, Constants.Colors)
    }
}

export default new Colors();
