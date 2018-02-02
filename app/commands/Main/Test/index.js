// $ID: index.js, 01 Feb 2018, 16:07, Leonid 'n3o' Knyazev $

import { Command, Argument } from '../../../base';

class TestCommand extends Command {
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

    async run(msg) {
        // msg.reply(`Tested!\nInvite: https://discordapp.com/oauth2/authorize?client_id=${this.bot.user.id}&scope=bot&permissions=8`);
        msg.reply('Tested!');
    }
}

export default new TestCommand();
