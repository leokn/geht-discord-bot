// $ID: index.js.js, 10 Jan 2018, 17:55, Leonid 'n3o' Knyazev $

import { Logger } from './utils';

const logger = new Logger();

// console.log('====================================');
// console.log(logger);
console.log('====================================');
logger.info('Testing!', {section: true});
logger.info('Test Info Message!');
logger.debug('Test Debug Message!');
logger.error('Test Error Message!');
console.log('====================================');

// import bot from './bot';
//
// (async () => {
//     try {
//         await bot.start();
//     } catch (error) {
//         bot.log.error(error.message);
//     }
// })();
