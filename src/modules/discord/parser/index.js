// $ID: parser.js, 12 Jan 2018, 18:32, Leonid 'n3o' Knyazev $

class Parser {
    /**
     * @constructor
     */
    constructor(client, config) {
        this.client = client;
        this.config = config;

        this.prefix = this.config.get('commands.prefix');
        this.channels = this.config.get('commands.channels');
    }


    /**
     * TODO: переписать парсер
     * @parse
     */
    parse(message) {
        return new Promise((resolve, reject) => {
            let command;
            let commands;

            const id = this.config.get('bot.id');
            const channels = this.channels.filter(n => n);
            const {content, author: {id: authorId}, channel: {id: channelId, type: channelType}} = message;

            // rejecting messages from bot-self
            if (authorId === this.client.user.id) {
                reject('Received message from bot-self: ', content);
            }

            // check commands.channels
            if (!channels.length || channels.indexOf(channelId) !== -1 || channelType === 'dm' || message.isMentioned(id)) {
                if (channelType === 'dm' || content.startsWith(this.prefix)) {
                    commands = content.split(' ').filter(n => n);

                    // if mentioned, then remove first part of message, like '<@012345678912345678>'
                    if (message.isMentioned(id)) {
                        commands = commands.slice(1);
                    }

                    // get the command
                    let [name] = commands;

                    // clear prefix, if exist
                    if (name.startsWith(this.prefix)) {
                        name = name.substring(this.prefix.length).trim();
                    }

                    // get params for command
                    let params = commands.slice(1).map(n => n.trim());

                    command = {
                        name: name,
                        params: params,
                        client: this.client,
                        message: message
                    };
                }
            }

            if (command) {
                resolve(command);
            } else {
                reject(message);
            }
        });
    }
}

export default Parser;
