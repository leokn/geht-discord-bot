// $ID: index.js, 24 Jan 2018, 14:20, Leonid 'n3o' Knyazev $

import { Module } from '../../base';

import Commands from '../../commands';

class CommandsService extends Module {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'commands',
            description: 'Commands Service.'
        });
    }


    /**
     * @override
     */
    async configure() {
        this.params = this.bot.config.get('discord');
    }


    /**
     * @override
     */
    async start() {
        const commands = [];

        Object.keys(Commands).forEach(group => {
            Object.keys(Commands[group]).forEach(command => {
                // Register module in the command.
                Commands[group][command].register(this.bot, this.params);

                commands.push(Commands[group][command]);
            });
        });

        this.bot.registry.registerCommands(commands);
    }
}

export default new CommandsService();
