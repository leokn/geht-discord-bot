// $ID: index.js, 23 Jan 2018, 19:46, Leonid 'n3o' Knyazev $

import { Precondition, PreconditionResult } from '../../../base';

class Administrator extends Precondition {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'administrator'
        });
    }

    /**
     * @override
     */
    async run(command, message, argument, value) {
        if (message.member.hasPermission('ADMINISTRATOR') === true) {
            return PreconditionResult.fromSuccess();
        }

        return PreconditionResult.fromError(command, 'You must be an administrator in order to use this command.');
    }
}

export default new Administrator();
