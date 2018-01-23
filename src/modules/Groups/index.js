// $ID: index.js, 23 Jan 2018, 18:16, Leonid 'n3o' Knyazev $

import { Module } from '../../base';

import Groups from '../../groups';

class GroupsModule extends Module {
    /**
     * @override
     */
    async start() {
        const groups = [];

        Object.keys(Groups).forEach(name => {
            // Register module in the group.
            Groups[name].register(this);

            groups.push(Groups[name]);
        });

        this.bot.registry.registerGroups(groups);
    }
}

export default new GroupsModule();
