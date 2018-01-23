// $ID: index.js, 23 Jan 2018, 11:05, Leonid 'n3o' Knyazev $

import { Argument, Command } from '../../../../types';

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
            args: [
                new Argument({
                    name: 'command',
                    key: 'command',
                    type: 'string',
                    defaultValue: '',
                    example: 'ping'
                })
            ]
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
