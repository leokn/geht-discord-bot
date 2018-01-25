// $ID: index.js, 23 Jan 2018, 14:11, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

class ReadyEvent extends Event {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'ready',
            types: [Constants.Events.READY]
        });
    }


    /**
     * @override
     */
    async handler() {
        const { prefix = '', status = '' } = this.params.commands;

        await this.bot.user.setAFK(true);

        if (status !== '') {
            await this.bot.user.setActivity(`${prefix}${status}`, {
                type: 'LISTENING'
            });
        }
    }
}

export default new ReadyEvent();
