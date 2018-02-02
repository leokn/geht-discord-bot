// $ID: index.js, 02 Feb 2018, 13:14, Leonid 'n3o' Knyazev $

import { transports } from 'winston';

import 'winston-daily-rotate-file';

class DebugFile extends transports.DailyRotateFile {
    /**
     * @override
     */
    constructor() {
        // Winston File transport.
        super({
            name: 'debug',
            level: 'debug',
            filename: './storage/logs/debug/log',
            datePattern: 'yyyy-MM-dd.',
            prepend: true
        });
    }


    /**
     * @override
     */
    log(level, msg, meta, callback) {
        if (level === this.level) {
            return super.log(level, msg, meta, callback);
        }

        callback(null, true);
    }
}

export default new DebugFile();
