// $ID: config.js, Fri, 26 Jan 2018 14:40:48, Leonid 'n3o' Knyazev $
module.exports = {
    /**
     * Bot client ID. Can be found in your bots application page.
     * https://discordapp.com/developers/applications/me
     * @type {String}
     * @required
     */
    id: process.env.BOT_ID || '',

    /**
     * Bot name.
     * @type {String}
     */
    name: process.env.BOT_NAME || 'GEHT Discord Bot',

    /**
     * Bot token. Can be found in your bots application page.
     * https://discordapp.com/developers/applications/me
     * @type {String}
     * @required
     */
    token: process.env.BOT_TOKEN || '',


    /**
     * Bot owners IDs. Allow some commands for bot owners.
     * You need setup IDs right or leave this option empty.
     * @type {Array}
     */
    owners: [],


    // *** Redis configuration ***
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || '6379'
    },


    // *** Database configuration ***
    database: {
        client: process.env.DB_CLIENT || 'mysql',

        connection: {
            host:     process.env.DB_HOST     || 'localhost',
            user:     process.env.DB_USER     || 'root',
            password: process.env.DB_PASSWORD || 'root',
            database: process.env.DB_DATABASE || 'discord'
        },

        pool: {
            min: process.env.DB_POLL_MIN || 0,
            max: process.env.DB_POLL_MAX || 5
        },

        migrations: {
            tableName: process.env.DB_MIGRATIONS_TABLE || 'migrations',
            directory: process.env.DB_MIGRATIONS_DIR   || './data/database/migrations'
        },

        seeds: {
            directory: process.env.DB_SEEDS_DIR || './data/database/seeds'
        }
    },


    // *** Discord configuration ***
    discord: {
        // Commands params.
        commands: {
            /**
             * Prefix for commands.
             * Bot will be parse commands only with this prefix.
             * @type {String}
             * @required
             */
            prefix: process.env.COMMANDS_PREFIX || '--',

            /**
             * Command name that will be showing in Bot status.
             * Prefix will be adding automatically.
             * @type {String}
             */
            status: process.env.COMMANDS_STATUS || 'help',

            /**
             * Channels IDs for commands.
             * Array with channels IDs where bot will be parse commands.
             * If empty, then bot will be parse commands in all channels on the server.
             * This option ignored with "direct" and "mentioned" messages.
             */
            channels: []
        },

        // Reconnection params.
        reconnect: {
            auto: true, // enable/disable auto reconnect
            timeout: 10 // timeout before auto reconnect (in seconds)
        }
    },


    // *** Modules ***
    modules: {},


    // *** Plugins ***
    plugins: {},


    /**
     * Bot version. Auto init from package.json
     * @type {String}
     */
    version: ''
};
