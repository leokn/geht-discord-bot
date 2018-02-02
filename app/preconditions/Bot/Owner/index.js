// $ID: index.js, 23 Jan 2018, 20:52, Leonid 'n3o' Knyazev $

import { Precondition, PreconditionResult } from '../../../base';

class Owner extends Precondition {
    async run(command, msg) {
        const owners = command.bot.config.get('owners');

        if (!Array.isArray(owners) || owners.indexOf(msg.author.id) === -1) {
            return PreconditionResult.fromError(command, 'You must be a bot owner in order to use this command.');
        }

        return PreconditionResult.fromSuccess();
    }
}

export default new Owner();
