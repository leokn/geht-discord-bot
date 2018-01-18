// $ID: index.js, 11 Jan 2018, 12:42, Leonid 'n3o' Knyazev $

import chalk from 'chalk';
import moment from 'moment';

class Logger {
    info(msg, type) {
        const _type = type || 'info';

        return this.render(chalk.white(`[${_type}]`), msg);
    }

    section(msg, type) {
        const _type = type || 'info';

        return this.render(chalk.white(`[${_type}]`), chalk.cyan(msg));
    }

    warn(msg, type) {
        const _type = type || 'warn';

        return this.render(chalk.white(`[${_type}]`), chalk.yellow(msg));
    }

    error(msg, type) {
        const _type = type || 'error';

        return this.render(chalk.white(`[${_type}]`), chalk.red(msg));
    }

    success(msg, type) {
        const _type = type || 'info';

        return this.render(chalk.white(`[${_type}]`), chalk.green(msg));
    }

    render(type, msg) {
        const time = moment().format('YYYY-MM-DD HH:mm:ss');

        console.log(chalk.cyan(`[${time}]`), type, msg);

        return this;
    }

    print(msg, color, background) {
        if (!color && !background) {
            console.log(msg);
        } else if (!background) {
            console.log(chalk[color](msg));
        } else {
            console.log(chalk[color][background](msg));
        }

        return this;
    }

    async banner(bot) {
        // print bot banner
        this.print(' Discord Bot ', 'bold', 'inverse');
        this.print(` name: ${bot.name}`);
        this.print(` version: ${bot.version}`);

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

export default Logger;
