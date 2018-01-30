// $ID: index.js, 29 Jan 2018, 18:16, Leonid 'n3o' Knyazev $

import { Command, Embed } from '../../../base';

import { Constants } from 'discord.js';

class RebootCommand extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['reboot'],
            groupName: 'system',
            description: 'Reboots the bot.',
            guildOnly: false,
            args: []
        });
    }


    /**
     * @override
     */
    async run(msg) {
        return await msg.channel.send({
            embed: new Embed({
                title: ':warning: Rebooting...',
                description: 'Wait a notification about Reboot status.',
                color: Constants.Colors.RED
            })
        }).then(async () => {
            await this.bot.cache.setAsync('reboot', msg.author.id);

            return process.exit(0);
        });
    }
}

export default new RebootCommand();
