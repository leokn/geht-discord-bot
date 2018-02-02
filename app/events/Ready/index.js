// $ID: index.js, 23 Jan 2018, 14:11, Leonid 'n3o' Knyazev $

import { Event, Embed } from '../../base';
import { Constants } from '../../utils';

class ReadyEvent extends Event {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'ready',
            events: [Constants.Events.READY]
        });
    }


    /**
     * @override
     */
    async handler() {
        const { prefix = '', status = '' } = this.params;

        await this.bot.user.setAFK(true);

        if (status !== '') {
            await this.bot.user.setActivity(`${prefix}${status}`, {
                type: 'LISTENING'
            });
        }

        await this.onReboot();
    }


    /**
     * @onReboot
     * Check 'reboot' flag in the cache.
     * If exist, then send a notification to the user, who called 'reboot' command.
     */
    async onReboot() {
        const id = await this.bot.cache.getAsync('reboot');

        if (id !== null) {
            const user = await this.bot.fetchUser(id);

            await user.send({
                embed: new Embed({
                    title: ':white_check_mark: Rebooted!',
                    color: Constants.Colors.GREEN
                })
            }).then(msg => msg.delete(5000));

            await this.bot.cache.delAsync('reboot');
        }
    }
}

export default new ReadyEvent();
