// $ID: Help.js.js, 22 Jan 2018, 21:21, Leonid 'n3o' Knyazev $

import { Command } from '../../../base';

class HelpCommand extends Command {
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
        return await msg.reply(`Hello, ${msg.author}!`);
    }
}

export default new HelpCommand();
