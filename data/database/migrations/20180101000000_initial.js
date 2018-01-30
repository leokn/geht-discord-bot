// $ID: 20180101000000_initial.js, Fri, 26 Jan 2018 13:24:04, Leonid 'n3o' Knyazev $
'use strict';


exports.up = function (knex, Promise) {
    return Promise.all([
        // knex.schema.createTable('person', (table) => {
        //     table.increments();
        //     table.string('name');
        // })
    ]);
};


exports.down = function (knex, Promise) {
    return Promise.all([
        // knex.schema.dropTable('person')
    ]);
};


// Disable transaction for this migration, by adding "transaction: false" to the 'config' export.
exports.config = {};
