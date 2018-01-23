// $ID: index.js, 12 Jan 2018, 14:51, Leonid 'n3o' Knyazev $

import { Client } from './base'

class Bot extends Client {
    /**
     * @constructor
     */
    constructor() {
        super();

        this.debug = true;
    }


    /**
     * @init
     */
    async init() {
        console.log('Init...');
    }


    /**
     * @load
     */
    async load() {
        console.log('Loading...');
    }


    /**
     * @start
     */
    async start() {
        console.log('Starting...');
    }
}


export default new Bot();
