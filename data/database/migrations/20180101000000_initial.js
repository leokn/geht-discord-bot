'use strict';

exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('person', (table) => {
            table.increments();

            table.string('name');
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('person')
    ]);
};
