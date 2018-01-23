// $ID: index.js, 22 Jan 2018, 15:28, Leonid 'n3o' Knyazev $

import chalk from 'chalk';
import moment from 'moment';
import { Logger as BaseLogger, transports } from 'winston';

class Logger extends BaseLogger {
    /**
     * @constructor
     */
    constructor() {
        // Define transports for Logger.
        const params = {
            levels: {message: 10},
            transports: [
                new (transports.Console)({
                    formatter: (options) => {
                        const time = this.getTime();
                        const level = this.getLevel(options);
                        const message = this.getMessage(options);

                        return `${time} ${level} ${message}`;
                    }
                })
            ]
        };

        // Instantiate 'winston' Logger.
        super(params);

        // return CLI for Logger.
        return this.cli();
    }


    /**
     * @getTime
     */
    getTime() {
        return chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);
    }


    /**
     * @getLevel
     */
    getLevel(options) {
        //return config.colorize(options.level, `[${options.level.toUpperCase()}]`);
        return `[${options.level.toUpperCase()}]`;
    }


    /**
     * @getMessage
     */
    getMessage(options) {
        const {
            section = false,
            success = false
        } = options.meta;

        let {message = ''} = options;

        if (success) {
            message = chalk.green(message);
        }

        if (section) {
            message = chalk.cyan(message);
        }

        return message;
    }


    /**
     * @section
     */
    section(...args) {
        return this.info(...args, { section: true });
    }


    /**
     * @success
     */
    success(...args) {
        return this.info(...args, { success: true });
    }


    /**
     * @banner
     */
    banner(bot) {
        if (bot) {
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
