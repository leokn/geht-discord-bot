// $ID: index.js, 24 Jan 2018, 14:20, Leonid 'n3o' Knyazev $

import { Module } from '../../base';

import Commands from '../../commands';

class CommandsModule extends Module {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'commands',
            description: 'Commands Service.'
        });

        /**
         * @type {Object}
         */
        this.params = {};
    }


    /**
     * @override
     */
    async configure(params = {}) {
        if (this.bot.config.has('commands')) {
            Object.assign(params, this.bot.config.get('commands'));
        }

        Object.assign(this.params, params);
    }


    /**
     * @override
     */
    async start() {
        const commands = [];

        Object.keys(Commands).forEach(group => {
            Object.keys(Commands[group]).forEach(command => {
                Commands[group][command].register(this.bot, this.params);

                commands.push(Commands[group][command]);
            });
        });

        this.bot.registry.registerCommands(commands);
    }
}

export default new CommandsModule();
