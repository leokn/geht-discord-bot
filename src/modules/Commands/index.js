// $ID: index.js, 23 Jan 2018, 18:26, Leonid 'n3o' Knyazev $

import { Module } from '../../base';

import Commands from '../../commands';

class CommandsModule extends Module {
    /**
     * @override
     */
    async start() {
        const commands = [];

        Object.keys(Commands).forEach(group => {
            Object.keys(Commands[group]).forEach(command => {
                // Register module in the command.
                Commands[group][command].register(this)

                commands.push(Commands[group][command]);
            });
        });

        this.bot.registry.registerCommands(commands);
    }
}

export default new CommandsModule();
