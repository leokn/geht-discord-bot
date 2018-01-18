// $ID: index.js, 18 Jan 2018, 19:21, Leonid 'n3o' Knyazev $

import { Module } from '../../types';

class Messages extends Module {
    /**
     * @override
     */
    async init() {
        this.bot.on('message', () => this.bot.log.info('Receiving message...', 'message'));
    }
}

export default Messages;
