// $ID: index.js, 22 Jan 2018, 15:28, Leonid 'n3o' Knyazev $

import chalk from 'chalk';
import moment from 'moment';

import { Logger as BaseLogger, transports, config } from 'winston';

class Logger extends BaseLogger {
    /**
     * @constructor
     */
    constructor() {
        // Instantiate 'winston' Logger.
        super();

        // Debug mode?
        const DEBUG = process.env.DEBUG === 'true';

        // Config object.
        const CONFIG = {
            transports: []
        };

        // Add 'cli' console transport...
        CONFIG.transports.push(new (transports.Console)({
            name: 'cli',
            level: DEBUG ? 'silly' : 'info',
            formatter: this.formatter.bind(this),
            rewriters: [this.rewriter.bind(this)],
            filters: [this.filter.bind(this)],
            handleExceptions: true,
            prettyPrint: true,
            stringify: true,
            colorize: true,
            json: false
        }));

        // Add 'info' file transports...
        CONFIG.transports.push(new (transports.File)({
            name: 'info',
            level: 'info',
            filename: './storage/logs/info.log',
            prettyPrint: false,
            stringify: false,
            colorize: false,
            json: false
        }));

        // Add 'error' file transport...
        CONFIG.transports.push(new (transports.File)({
            name: 'error',
            level: 'error',
            filename: './storage/logs/error.log',
            prettyPrint: false,
            stringify: false,
            colorize: false,
            json: false
        }));

        // Add 'debug' file transport...
        if (DEBUG) {
            CONFIG.transports.push(new (transports.File)({
                name: 'debug',
                level: 'silly',
                filename: './storage/logs/debug.log',
                prettyPrint: false,
                stringify: false,
                colorize: false,
                json: false
            }));
        }

        // Configuring...
        this.configure(CONFIG);

        // return CLI for Logger.
        return this.cli();
    }


    /**
     * @formatter
     */
    formatter(options) {
        const time = this.getTime();
        const level = this.getLevel(options);
        const message = this.getMessage(options);

        return `${time} ${level} ${message}`;
    }


    /**
     * @rewriter
     */
    rewriter(...args) {
        const [,, meta] = [...args];

        const { NODE_ENV = 'development', DEBUG = false } = process.env;

        Object.assign(meta, {
            env: NODE_ENV,
            debug: DEBUG === 'true',
            development: NODE_ENV !== 'production',
            production: NODE_ENV === 'production'
        });

        return meta;
    }


    /**
     * @filter
     */
    filter(...args) {
        const [, msg] = [...args];

        return msg;
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
        return config.colorize(options.level, `[${options.level.toUpperCase()}]`);
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
