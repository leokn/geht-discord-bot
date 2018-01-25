module.exports = {
    // Bot options.
    bot: {
        /**
         * Bot client ID. Can be found in your bots application page.
         * https://discordapp.com/developers/applications/me
         * @required
         */
        id: '',

        /**
         * Bot token. Can be found in your bots application page.
         * https://discordapp.com/developers/applications/me
         * @required
         */
        token: '',

        /**
         * Bot owner ID. Allow some commands for bot owner.
         * You need setup your ID right or leave this option empty.
         */
        owner: ''
    },


    // Sharding options.
    sharding: {
        /**
         * Enable/Disable "Sharding" mode.
         * @description Not implemented yet.
         */
        enabled: false
    },


    // Commands options.
    commands: {
        /**
         * Prefix for commands.
         * Bot will be parse commands only with this prefix.
         * @required
         */
        prefix: '--',

        /**
         * Channels IDs for commands.
         * Array with channels ids where bot will be parse commands.
         * If empty, then bot will be parse commands in all channels on the server.
         */
        channels: ['']
    }
};
