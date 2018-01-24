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
        let reply;

        const users = await this.bot.db.select('*').from('users')
            .catch(error => {
                this.bot.log.error(`[sql] (${error.code}) ${error.sqlMessage}.`);

                return [];
            });

        if (users.length > 0) {
            reply = `Hello! Uers in DB: ${users.map(user => user.name)}`;
        } else {
            reply = 'Hello! There is no user in DB.'
        }

        return await msg.reply(reply);
    }
}

export default new HelpCommand();
