// $ID: index.js, 23 Jan 2018, 11:50, Leonid 'n3o' Knyazev $

import { Command as BaseCommand } from 'patron.js';

class Command extends BaseCommand {
    /**
     * @register
     */
    register(module) {
        this.module = module;
    }
}

export default Command;
