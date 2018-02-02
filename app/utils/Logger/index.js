// $ID: index.js, 22 Jan 2018, 15:28, Leonid 'n3o' Knyazev $

import chalk from 'chalk';
import moment from 'moment';

import { Logger as BaseLogger } from 'winston';

import transports from './transports';

class Logger extends BaseLogger {
    /**
     * @constructor
     */
    constructor() {
        // Instantiate 'winston' Logger.
        super();

        // Configuring...
        this.configure({
            transports: transports
        });

        // return CLI Logger.
        return this.cli();
    }


    /**
     * @banner
     */
    banner(bot) {
        if (bot) {
            // empty line
            this.print('');

            // print bot banner
            this.print(' Discord Bot ', 'bold', 'inverse');
            this.print(` name: ${bot.config.get('name')}`);
            this.print(` version: ${bot.config.get('version')}`);

            // empty line
            this.print('');

            // print environment mode
            if (process.env.NODE_ENV === 'production') {
                this.print(' Production mode ', 'whiteBright', 'bgGreen');
            } else {
                this.print(' Development mode ', 'whiteBright', 'bgRed');
            }

            // empty line
            this.print('');
        }
    }


    /**
     * @print
     */
    print(message, color, background) {
        if (!color && !background) {
            console.log(message);
        } else if (!background) {
            console.log(chalk[color](message));
        } else {
            console.log(chalk[color][background](message));
        }

        return this;
    }
}

export default Logger;
