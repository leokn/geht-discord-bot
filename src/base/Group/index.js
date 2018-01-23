// $ID: index.js, 23 Jan 2018, 12:24, Leonid 'n3o' Knyazev $

import { Group as BaseGroup } from 'patron.js';

class Group extends BaseGroup {
    /**
     * @register
     */
    register(module) {
        this.module = module;
    }
}

export default Group;
