// $ID: index.js, 23 Jan 2018, 14:27, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';
import { CommandError } from 'patron.js';
import { DiscordAPIError } from 'discord.js';

class MessageEvent extends Event {
    constructor() {
        super({
            name: 'message',
            events: [Constants.Events.MESSAGE_CREATE]
        });
    }

    async handler(input) {
        this.filter(input)
            .then(async (message) => {
                // Logging received message...
                this.messageLog(message);

                // Handling command...
                const result = await this.bot.handler.run(message, message.prefix);

                return this.result(result, message);
            })
            .catch(error => {
                this.log.debug(`[message] ${error}`);
            });
    }

    async result(result, message) {
        const { prefix = '' } = this.params;

        if (result.success === false) {
            let reply;

            switch (result.commandError) {
                case CommandError.Exception:
                    if (result.error.code instanceof DiscordAPIError) {
                        if (result.error.code === 400) {
                            reply = 'There seems to have been a bad request. Please report this issue.';
                        } else if (result.error.code === 0 || result.error.code === 404 || result.error.code === 50013) {
                            reply = 'I do not have permission to do that.';
                        } else if (result.error.code === 50007) {
                            reply = 'I do not have permission to DM this user. ' +
                                'Enabling the DM Privacy Settings for this server may solve this issue.';
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
                    reply = 'You are incorrectly using this command.\n' +
                        `Usage: '${prefix}${result.command.getUsage()}'\n` +
                        `Example: '${prefix}${result.command.getExample()}'`;
                    break;

                default:
                    //reply = result.errorReason;
                    break;
            }

            this.bot.log.error(`[command] Unsuccessful command result: ${message.id} | Reason: ${result.errorReason}`);

            if (reply) {
                await message.reply(reply);
            }
        } else {
            this.bot.log.info('[command] Successful command result.');
        }
    }

    async filter(input) {
        return new Promise((resolve, reject) => {
            const { user: { id: botId } } = this.bot;
            const { prefix = '', channels = [] } = this.params;

            const {
                content,
                author: { id: authorId, bot: authorBot = false },
                channel: { id: channelId, type: channelType, name: channelName }
            } = input;

            const isBot = authorBot || authorId === botId;
            const isDirect = channelType && channelType === 'dm';
            const isChannels = !isDirect && (
                channels.length === 0 ||
                channels.indexOf(channelId) !== -1 ||
                channels.indexOf(channelName) !== -1
            );

            // set 'input' prefix...
            input.prefix = (isDirect && !content.startsWith(prefix)) ? '' : prefix;

            if (isBot) {
                // [filtered]: if message author is bot-self or another bot.
                return reject(`Filtered by 'self-bot' filter: ${content}`);
            }

            if (!isDirect && !isChannels) {
                // [filtered]: if message not a DM and sended to a channel which not in 'commands.channels' list.
                return reject(`Filtered by 'commands.channels' filter: ${content}`);
            }

            if (!isDirect && !content.startsWith(prefix)) {
                // [filtered]: if message not a DM and not starts with 'commands.prefix'
                return reject(`Filtered by 'commands.prefix' filter: ${content}`);
            }

            return resolve(input);
        });
    }

    messageLog(message) {
        const {
            id: messageId,
            content: messageContent,
            author: { id: authorId, tag: authorTag } = {},
            channel: { id: channelId, type: channelType, name: channelName } = {}
        } = message;

        // message id
        let log = `[message] id: ${messageId}`;

        // author info
        log = `${log} | author.id: ${authorId} | author.tag: ${authorTag}`;

        // channel info
        log = `${log} | channel.id: ${channelId} | channel.type: ${channelType} | channel.name: ${channelName}`;

        // guild info
        if (message.guild !== null) {
            log = `${log} | guild.id: ${message.guild.id} | guild.name: ${message.guild.name}`;
        }

        // message content
        log = `${log} | content: ${messageContent}`;

        // Debug log all commands *before* execution begins.
        this.log.debug(log);
    }
}

export default new MessageEvent();
