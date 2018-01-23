// $ID: Help.js.js, 22 Jan 2018, 21:21, Leonid 'n3o' Knyazev $

import { Argument, Command } from '../../../types';

class Help extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['help', 'commands', 'command', 'cmd', 'cmds', 'support', 'docs'],
            groupName: 'system',
            description: 'All command information.',
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
        await msg.reply('Help command executed!');
    }
}

export default new Help();
