// $ID: index.js, 23 Jan 2018, 12:24, Leonid 'n3o' Knyazev $

import { Group as BaseGroup } from 'patron.js';

class Group extends BaseGroup {
    /**
     * @register
     */
    register(bot = null, params = {}) {
        this.bot = bot;
        this.params = params;
    }
}

export default Group;
