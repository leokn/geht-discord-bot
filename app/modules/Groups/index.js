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
    async configure(params = {}) {
        if (this.config.has('discord')) {
            Object.assign(params, this.config.get('discord'));
        }

        if (this.config.has('commands')) {
            Object.assign(params, this.config.get('commands'));
        }

        await super.configure(params);
    }


    /**
     * @override
     */
    async start() {
        const groups = [];

        Object.keys(Groups).forEach(name => {
            Groups[name].register(this.bot, this.log, this.config, this.params);

            groups.push(Groups[name]);
        });

        this.bot.registry.registerGroups(groups);
    }
}

export default new GroupsService();
