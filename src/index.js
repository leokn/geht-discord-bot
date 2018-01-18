// $ID: index.js.js, 10 Jan 2018, 17:55, Leonid 'n3o' Knyazev $

import bot from './bot';

(async () => {
    try {
        await bot.start()
            .then(status => bot.log.success(status).print(''))
            .catch(error => bot.log.error(error).print(''));
    } catch (error) {
        console.error(error);
    }
})();
