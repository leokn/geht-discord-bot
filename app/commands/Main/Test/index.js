// $ID: index.js, 01 Feb 2018, 16:07, Leonid 'n3o' Knyazev $

import { Command, Argument } from '../../../base';

class TestCommand extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['test'],
            groupName: 'main',
            description: 'Test command.',
            guildOnly: false,
            args: [
                new Argument({
                    key: 'command',
                    name: 'command',
                    type: 'string',
                    example: 'command',
                    defaultValue: '',
                    optional: true
                })
            ]
        });
    }


    /**
     * @override
     */
    async run(msg) {
        msg.reply('Tested!');
    }
}

export default new TestCommand();
