// $ID: Help.js.js, 22 Jan 2018, 21:21, Leonid 'n3o' Knyazev $

import { Command, Argument, Embed } from '../../../base';
import { Constants, Messenger } from '../../../utils';

import axios from 'axios';

class HelpCommand extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['help'],
            groupName: 'main',
            description: 'All command information.',
            guildOnly: false,
            args: [
                new Argument({
                    key: 'command',
                    name: 'command',
                    type: 'string',
                    example: 'missions'
                })
            ]
        });

        this.axios = axios.create({
            baseURL: 'https://www.speedrun.com/api/v1'
        });
    }


    /**
     * @override
     */
    async run(msg, args) {
        const cmd = args.command.toLowerCase();

        switch (cmd) {
            case 'heists':
                return this.printHeists(msg);
                break;

            case 'missions':
                return this.printMissions(msg);
                break;

            default:
                return await msg.reply(`Hello, ${msg.author.username}`);
                break;
        }
    }


    async printHeists(msg) {
        const embed = new Embed();

        await this.axios.get('/games/j1nqoy1p/categories').then(async (response) => {
            const { data: { data = [] } } = response;

            if (data.length > 0) {
                data.forEach(heist => {
                    let { name, rules } = heist;

                    if (rules.length > 1023) {
                        rules = rules.substring(0, 1023);
                    }

                    if (!rules || rules === '') {
                        rules = 'Empty rules string.';
                    }

                    console.log('NAME: ', name, ' / RUILES: ', rules.length);

                    embed.addField(name, rules);
                });
            }

            return await msg.channel.send({embed});
        });
    }


    async printMissions(msg) {
        let content = '';

        const embed = Messenger.embed({
            color: Constants.Colors.BLUE
        });

        await this.axios.get('/games/j1nqoy1p/levels').then(async (response) => {
            const { data: { data = [] } } = response;

            if (data.length > 0) {
                data.forEach(level => {
                    content += `${level.name}\n`;
                });
            }

            if (content) {
                embed.setTitle('GTA Online: Contact Missions');
                embed.setDescription(content);
            } else {
                embed.setTitle(`Hello, ${msg.author.username}!`);
            }

            return await Messenger.send(msg.channel, embed);
        });
    }
}

export default new HelpCommand();
