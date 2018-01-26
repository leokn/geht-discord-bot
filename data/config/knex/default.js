// $ID: default.js, 26 Jan 2018, 12:37, Leonid 'n3o' Knyazev $
module.exports = {
    development: {
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
    }
};
