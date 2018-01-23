// $ID: index.js, 23 Jan 2018, 11:05, Leonid 'n3o' Knyazev $

import { Command } from '../../../base';

import preconditions from '../../../preconditions';

class Hello extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['hello', 'hi'],
            groupName: 'main',
            description: 'Hello command.',
            guildOnly: false,
            args: []
        });
    }


    /**
     * @override
     */
    async run(msg) {
        await msg.reply('Hello command executed!');
    }
}

export default new Hello();
