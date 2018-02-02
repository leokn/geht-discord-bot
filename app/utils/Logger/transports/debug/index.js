// $ID: index.js, 02 Feb 2018, 13:14, Leonid 'n3o' Knyazev $

import { transports } from 'winston';
import 'winston-daily-rotate-file';

class DebugFile extends transports.DailyRotateFile {
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

    log(level, msg, meta, callback) {
        if (level === this.level) {
            return super.log(level, msg, meta, callback);
        }

        return callback(null, true);
    }
}

export default new DebugFile();
