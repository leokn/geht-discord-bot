// $ID: index.js, 30 Jan 2018, 19:16, Leonid 'n3o' Knyazev $

import { Command, Argument } from '../../../base';
import { Constants, Messenger } from '../../../utils';

class AliasCommand extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['alias', 'aliases'],
            groupName: 'system',
            description: 'View a command\\\'s aliases.',
            guildOnly: false,
            args: [
                new Argument({
                    key: 'cmd',
                    name: 'command',
                    type: 'string',
                    example: 'alias'
                })
            ]
        });
    }


    /**
     * @override
     */
    async run(msg, args) {
        const arg = args.cmd.toLowerCase();
        const cmd = msg.client.registry.commands.find((x) => x.names.some((y) => y === arg));


        if (cmd === undefined) {
            return Messenger.send(msg.channel, {
                title: `Command \`'${arg}'\` not found.`,
                color: Constants.Colors.RED
            });
        }

        const aliases = cmd.names.slice(1, cmd.names.length);

        if (aliases.length === 0) {
            return Messenger.send(msg.channel, {
                title: `Command \`'${arg}'\` has no aliases.`
            });
        }

        aliases.sort();

        if (cmd.names[0] === arg) {
            return Messenger.send(msg.channel, {
                title: `Command \`'${arg}'\` have next aliases:`,
                description: `[${aliases.join(', ')}]`,
                color: Constants.Colors.BLUE
            });
        }

        const filtered = aliases.filter(item => item !== arg);

        let title = `Command \`'${arg}'\` is an alias for command \`'${cmd.names[0]}'\``;
        let description = '';

        if (filtered.length > 0) {
            filtered.sort();

            title = `${title}, which have next aliases:`;
            description = `[${filtered.join(', ')}]`;
        }

        return Messenger.send(msg.channel, {
            title: title,
            description: description,
            color: Constants.Colors.BLUE
        });
    }
}

export default new AliasCommand();
