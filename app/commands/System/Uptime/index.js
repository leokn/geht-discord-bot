// $ID: index.js, 29 Jan 2018, 18:02, Leonid 'n3o' Knyazev $

import { Command } from '../../../base';
import { NumberUtils } from '../../../utils';

class UptimeCommand extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['uptime', 'ut'],
            groupName: 'system',
            description: 'See how long your bot has been running.',
            guildOnly: false,
            args: []
        });
    }


    /**
     * @override
     */
    async run(msg) {
        const uptime = NumberUtils.msToTime(msg.client.uptime);
        return await msg.reply(`ℹ Uptime ${uptime.hours} hours, ${uptime.minutes} minutes, ${uptime.seconds} seconds.`);
    }
}

export default new UptimeCommand();
