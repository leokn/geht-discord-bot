// $ID: index.js, 29 Jan 2018, 18:02, Leonid 'n3o' Knyazev $

import { Command, Embed } from '../../../base';
import { Constants, Random, NumberUtils } from '../../../utils';

class UptimeCommand extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['uptime', 'ut'],
            groupName: 'system',
            description: 'See how long your bot has been running.',
            guildOnly: false
        });

        /**
         * @icons
         * @type {Array}
         */
        this.icons = [
            ':clock1:',
            ':clock2:',
            ':clock3:',
            ':clock4:',
            ':clock5:',
            ':clock6:',
            ':clock7:',
            ':clock8:',
            ':clock9:',
            ':clock10:',
            ':clock11:',
            ':clock12:'
        ];
    }


    /**
     * @override
     */
    async run(msg) {
        return await this.uptime(msg);
    }


    /**
     * @uptime
     */
    async uptime(msg) {
        const icon = Random.arrayElement(this.icons);
        const uptime = NumberUtils.msToTime(msg.client.uptime);

        return await msg.channel.send({
            embed: new Embed({
                title: `${icon} Uptime ${uptime.days} days, ${uptime.hours} hours, ${uptime.minutes} minutes, ${uptime.seconds} seconds.`
            })
        });
    }
}

export default new UptimeCommand();
