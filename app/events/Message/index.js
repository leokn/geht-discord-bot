// $ID: index.js, 23 Jan 2018, 14:27, Leonid 'n3o' Knyazev $

import { Event } from '../../base';
import { Constants } from '../../utils';

import { CommandError } from 'patron.js';
import { DiscordAPIError } from 'discord.js';

class MessageEvent extends Event {
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
    async handler(input) {
        return this.filter(input)
            .then(async (message) => {
                // message
                const { content: messageContent, channel: { type: channelType } } = message;

                // Logging received message...
                if (this.bot.debug) {
                    this.messageLog(message);
                }

                // checking prefix...
                let { prefix = '' } = this.params.commands;

                // reset prefix if we receive a DM message and content not starts with prefix.
                if (channelType === 'dm' && !messageContent.startsWith(prefix)) {
                    prefix = '';
                }

                const result = await this.bot.handler.run(message, prefix);

                return this.result(result, message);
            })
            .catch(error => {
                if (this.bot.debug) {
                    this.bot.log.info(`[message] ${error}`);
                }
            });
    }


    /**
     * @result
     */
    async result(result, message) {
        const { prefix = '' } = this.params.commands;

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


    /**
     * @filter
     */
    async filter(input) {
        return new Promise((resolve, reject) => {
            const { prefix = '', channels = [] } = this.params.commands;

            const {
                content,
                author: { id: authorId, bot: authorBot },
                channel: { id: channelId, type: channelType }
            } = input;

            // [filtered]: if message author is bot-self or another bot.
            if (authorBot === true || authorId === this.bot.user.id) {
                return reject(`Filtered by 'self-bot' filter: ${content}`);
            }

            // [filtered]: if message not a DM and sended to a channel which not in 'commands.channels' list.
            if (channelType !== 'dm' && channels.length && channels.indexOf(channelId)) {
                return reject(`Filtered by 'commands.channels' filter: ${content}`);
            }

            // [filtered]: if message not a DM and not starts with 'commands.prefix'
            if (channelType !== 'dm' && prefix && !content.startsWith(prefix)) {
                return reject(`Filtered by 'commands.prefix' filter: ${content}`);
            }

            return resolve(input);
        });
    }


    /**
     * @messageLog
     */
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
        this.bot.log.info(log);
    }
}

export default new MessageEvent();
