// $ID: index.js, 02 Feb 2018, 13:10, Leonid 'n3o' Knyazev $

import chalk from 'chalk';
import moment from 'moment';
import { transports, config } from 'winston';

class Console extends transports.Console {
    constructor() {
        // DEBUG mode?
        const DEBUG = process.env.NODE_ENV !== 'production' || process.env.DEBUG === 'true';

        // Winston Console transport.
        super({
            name: 'console',
            level: DEBUG ? 'debug' : 'info',
            formatter: options => this.format(options),
            handleExceptions: true,
            prettyPrint: true,
            stringify: true,
            colorize: true,
            json: false
        });

        // Register filters...
        this.filters = [this.filter.bind(this)];

        // Register rewriters...
        this.rewriters = [this.rewriter.bind(this)];
    }

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

    filter(...args) {
        const [, msg] = [...args];

        return msg;
    }

    format(options) {
        const time = this.getTime();
        const level = this.getLevel(options);
        const message = this.getMessage(options);

        return `${time} ${level} ${message}`;
    }

    getTime() {
        return chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);
    }

    getLevel(options) {
        return config.colorize(options.level, `[${options.level.toUpperCase()}]`);
    }

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
}

export default new Console();
