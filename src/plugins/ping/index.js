// $ID: index.js, 16 Jan 2018, 19:03, Leonid 'n3o' Knyazev $

import Plugin from '../../types/plugin';

class Ping extends Plugin {
    /**
     * @execute
     */
    async execute(command) {
        const {message} = command;

        let text = 'ℹ Pong!';

        const startDate = Date.now();
        const response = await message.reply(text);
        const receivedTime = Date.now();

        const ping = Math.max(0, (response.createdAt.getTime() - startDate));
        const delay = (receivedTime - startDate) - ping;
        const delayStr = delay >= 0 ? `+${delay}` : `${delay}`;

        text = `ℹ Pong - \`${ping}ms\` (\`${delayStr}ms\`)`;

        return await response.edit(text);
    }
}

export default Ping;
