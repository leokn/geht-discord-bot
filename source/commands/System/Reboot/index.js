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
        const embed = new Embed({
            title: ':warning: Rebooting...',
            color: Constants.Colors.RED
        });

        return await msg.channel.send({ embed: embed });
    }
}

export default new RebootCommand();
