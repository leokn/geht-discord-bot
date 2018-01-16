// $ID: index.js.js, 10 Jan 2018, 17:55, Leonid 'n3o' Knyazev $

import bot from './bot';

(async () => {
    try {
        await bot.init()
            .then(() => bot.start())
            .then(status => bot.logger.success(status))
            .catch(error => bot.logger.error(error.message ? error.message : error));
    } catch (error) {
        console.error(error);
    }
})();
