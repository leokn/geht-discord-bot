// $ID: index.js, 23 Jan 2018, 13:03, Leonid 'n3o' Knyazev $

import { Constants as DiscordConstants } from 'discord.js';

class Events {
    constructor() {
        Object.assign(this, DiscordConstants.Events)
    }
}

export default new Events();
