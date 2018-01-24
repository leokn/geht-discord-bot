// $ID: index.js, 24 Jan 2018, 14:20, Leonid 'n3o' Knyazev $

import { Service } from '../../base';

import Groups from '../../groups';

class GroupsService extends Service {
    /**
     * @override
     */
    constructor() {
        super({
            name: 'Groups',
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
