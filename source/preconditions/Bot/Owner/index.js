// $ID: index.js, 23 Jan 2018, 20:52, Leonid 'n3o' Knyazev $

import { Precondition, PreconditionResult } from '../../../base';

class Owner extends Precondition {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'bot.owner'
        });
    }


    /**
     * @override
     */
    async run(command, message) {
        const owners = command.module.bot.config.get('owners');

        if (Array.isArray(owners) && owners.length > 0 && owners.indexOf(message.author.id) === -1) {
            return PreconditionResult.fromError(command, 'You must be a bot owner in order to use this command.');
        }

        return PreconditionResult.fromSuccess();
    }
}

export default new Owner();
