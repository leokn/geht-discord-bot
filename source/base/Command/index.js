// $ID: index.js, 23 Jan 2018, 11:50, Leonid 'n3o' Knyazev $

import { Command as BaseCommand } from 'patron.js';

class Command extends BaseCommand {
    /**
     * @register
     */
    register(bot = null, params = {}) {
        this.bot = bot;
        this.params = params;
    }
}

export default Command;
