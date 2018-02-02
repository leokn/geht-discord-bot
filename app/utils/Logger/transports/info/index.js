// $ID: index.js, 02 Feb 2018, 13:13, Leonid 'n3o' Knyazev $

import { transports } from 'winston';
import 'winston-daily-rotate-file';

class InfoFile extends transports.DailyRotateFile {
    constructor() {
        // DEBUG mode?
        const DEBUG = process.env.NODE_ENV !== 'production' || process.env.DEBUG === 'true';

        // Winston File transport.
        super({
            name: 'info',
            level: DEBUG ? 'debug' : 'info',
            filename: './storage/logs/info/log',
            datePattern: 'yyyy-MM-dd.',
            prepend: true
        });
    }
}

export default new InfoFile();
