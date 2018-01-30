// $ID: index.js.js, 10 Jan 2018, 17:55, Leonid 'n3o' Knyazev $

import bot from './bot';

(async () => {
    try {
        await bot.start();
    } catch (error) {
        bot.log.error(error.message);
    }
})();
