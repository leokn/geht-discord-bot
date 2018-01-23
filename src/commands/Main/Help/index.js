// $ID: Help.js.js, 22 Jan 2018, 21:21, Leonid 'n3o' Knyazev $

import { Command } from '../../../base';

class Help extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['help', 'commands', 'command', 'cmd', 'cmds', 'support', 'docs'],
            groupName: 'main',
            description: 'All command information.',
            guildOnly: false,
            args: []
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
