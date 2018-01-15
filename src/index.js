// $ID: index.js.js, 10 Jan 2018, 17:55, Leonid 'n3o' Knyazev $

import Bot from './bot';

(async () => {
    try {
        const bot = new Bot();

        await bot.init()
            .then(() => bot.logger.success('Started'))
            .catch(error => bot.logger.error(error.message ? error.message : error));
    } catch (error) {
        console.error(error);
    }
})();
