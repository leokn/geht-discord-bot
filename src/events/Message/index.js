// $ID: index.js, 23 Jan 2018, 14:27, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

import { CommandError } from 'patron.js';
import { DiscordAPIError } from 'discord.js';

class Message extends Event {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'message',
            types: [Constants.Events.MESSAGE_CREATE]
        });
    }


    /**
     * @override
     */
    async handler(message) {
        if (message.author.bot === true || message.author.id === this.bot.user.id) {
            return;
        }


        const inGuild = message.guild !== null;

        if (this.bot.debug) {
            this.bot.log.info('[message] Message Id: ' + message.id + ' | User Id: ' + message.author.id + (inGuild ? ' | Guild Id: ' + message.guild.id : '') + ' | User: ' + message.author.tag + (inGuild ? ' | Guild: ' + message.guild.name : '') + ' | Content: ' + message.content); // Debug log all commands *before* execution begins.
        }

        let prefix = this.bot.config.get('commands.prefix');

        if (message.channel.type === 'dm') {
            prefix = '';
        }

        const result = await this.bot.handler.run(message, prefix);

        if (result.success === false) {
            let reply;

            switch (result.commandError) {
                case CommandError.CommandNotFound:
                    return;
                    break;

                case CommandError.Exception:
                    if (result.error.code instanceof DiscordAPIError) {
                        if (result.error.code === 400) {
                            reply = 'There seems to have been a bad request. Please report this issue.';
                        } else if (result.error.code === 0 || result.error.code === 404 || result.error.code === 50013) {
                            reply = 'I do not have permission to do that.';
                        } else if (result.error.code === 50007) {
                            reply = 'I do not have permission to DM this user. Enabling the DM Privacy Settings for this server may solve this issue.';
                        } else if (result.error.code >= 500 && result.error.code < 600) {
                            reply = 'An error has occurred on Discord\'s part. Sorry, nothing we can do.';
                        } else {
                            reply = result.errorReason;
                        }
                    } else {
                        reply = result.errorReason;
                         this.bot.log.error(result.error);
                    }
                    break;

                case CommandError.InvalidArgCount:
                    reply = 'You are incorrectly using this command.\n**Usage:** `' + prefix + result.command.getUsage() + '`\n**Example:** `' + prefix + result.command.getExample() + '`';
                    break;

                default:
                    reply = result.errorReason;
                    break;
            }

            this.bot.log.error('[command] Unsuccessful command result: ' + message.id + ' | Reason: ' + result.errorReason);

            return await message.reply(reply);
        }

        this.bot.log.info('[command] Successful command result: ' + message.id);
    }
}

export default new Message();
