module.exports = {
    // Bot options.
    bot: {
        /**
         * Bot client ID. Can be found in your bots application page.
         * https://discordapp.com/developers/applications/me
         * @required
         */
        id: '396673027020029964',

        /**
         * Bot token. Can be found in your bots application page.
         * https://discordapp.com/developers/applications/me
         * @required
         */
        token: 'Mzk2NjczMDI3MDIwMDI5OTY0.DSk2EA.Fus6uXnBBkkTyjbP1Re7IP_Okzs',


        /**
         * Bot name. Used in logs and system information.
         */
        name: 'GEHT',

        /**
         * Bot owner ID. Allow some commands for bot owner.
         * You need setup your ID right or leave this option empty.
         */
        owner: '270626369103331329'
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
         * Array with channels IDs where bot will be parse commands.
         * If empty, then bot will be parse commands in all channels on the server.
         * This option ignored with "direct" and "mentioned" messages.
         */
        channels: ['395721381670813696']
    },


    // Modules.
    modules: [
        /**
         * Discord module.
         */
        {
            name: 'Discord',
            path: 'discord',
            params: {}
        }
    ]
};
