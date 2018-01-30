// $ID: index.js, 24 Jan 2018, 14:20, Leonid 'n3o' Knyazev $

import { Module } from '../../base';

import Groups from '../../groups';

class GroupsService extends Module {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'groups',
            description: 'Groups Service.'
        });
    }


    /**
     * @override
     */
    async configure() {
        this.params = this.bot.config.get('discord');
    }


    /**
     * @override
     */
    async start() {
        const groups = [];

        Object.keys(Groups).forEach(name => {
            // Register module in the group.
            Groups[name].register(this.bot, this.params);

            groups.push(Groups[name]);
        });

        this.bot.registry.registerGroups(groups);
    }
}

export default new GroupsService();
