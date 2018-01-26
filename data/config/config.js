// $ID: config.js, Fri, 26 Jan 2018 14:40:48, Leonid 'n3o' Knyazev $
module.exports = {
    /**
     * Bot client ID. Can be found in your bots application page.
     * https://discordapp.com/developers/applications/me
     * @type {String}
     * @required
     */
    id: '',

    /**
     * Bot name.
     * @type {String}
     */
    name: 'GEHT Discord Bot',

    /**
     * Bot token. Can be found in your bots application page.
     * https://discordapp.com/developers/applications/me
     * @type {String}
     * @required
     */
    token: '',


    /**
     * Bot owners IDs. Allow some commands for bot owners.
     * You need setup IDs right or leave this option empty.
     * @type {Array}
     */
    owners: [],


    // *** Redis configuration ***
    redis: {
        host: 'localhost',
        port: '6379'
    },


    // *** Database configuration ***
    database: {
        client: 'mysql',

        connection: {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'discord'
        },

        pool: {
            min: 0,
            max: 5
        },

        migrations: {
            tableName: 'migrations',
            directory: './data/database/migrations'
        },

        seeds: {
            directory: './data/database/seeds'
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
            prefix: '--',

            /**
             * Command name that will be showing in Bot status.
             * Prefix will be adding automatically.
             * @type {String}
             */
            status: 'help',

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
