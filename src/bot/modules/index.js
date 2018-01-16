// $ID: index.js, 16 Jan 2018, 17:17, Leonid 'n3o' Knyazev $

import Events from 'events';

import modules from '../../modules';

class Modules extends Events {
    /**
     * @constructor
     */
    constructor(bot) {
        super();

        this.bot = bot;
        this.logger = this.bot.logger;

        this.modules = {};
    }


    /**
     * @register
     */
    register(module) {
        const {id, name, params} = module;

        this.logger.info(`Loading '${name}' module...`);

        if (!modules[id]) {
            this.logger.error(`Loading '${name}' module failed (not found).`)
        } else {
            this.modules[id] = new modules[id](this.bot, params);
        }
    }


    /**
     * @get
     */
    get(module) {
        return this.modules[module];
    }
}

export default Modules;
