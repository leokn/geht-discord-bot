// $ID: index.js, 24 Jan 2018, 14:20, Leonid 'n3o' Knyazev $

import { Module } from '../../base';
import Commands from '../../commands';

class CommandsModule extends Module {
    constructor() {
        super({
            name: 'commands',
            description: 'Commands Service.'
        });
    }

    async configure(params = {}) {
        if (this.config.has('discord')) {
            Object.assign(params, this.config.get('discord'));
        }

        if (this.config.has('commands')) {
            Object.assign(params, this.config.get('commands'));
        }

        await super.configure(params);
    }

    async start() {
        const commands = [];

        Object.keys(Commands).forEach(group => {
            Object.keys(Commands[group]).forEach(command => {
                Commands[group][command].register(this.bot, this.log, this.config, this.params);

                commands.push(Commands[group][command]);
            });
        });

        this.bot.registry.registerCommands(commands);
    }
}

export default new CommandsModule();
