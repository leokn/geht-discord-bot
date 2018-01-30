// $ID: index.js, 29 Jan 2018, 16:41, Leonid 'n3o' Knyazev $

import { Command } from '../../../base';

class PingCommand extends Command {
    /**
     * @override
     */
    constructor() {
        super({
            names: ['ping'],
            groupName: 'system',
            description: 'Pings the bot.',
            guildOnly: false,
            hasCooldown: true
        });
    }


    /**
     * @override
     */
    async run(msg) {
        const key = `pings.from.${msg.author.id}`;
        const count = await this.bot.cache.getAsync(key);

        if (count === null) {
            await this.bot.cache.setAsync(key, 1, 'EX', 25);
            await this.ping(msg);
        } else if (parseInt(count, 10) <= 3) {
            await this.bot.cache.incrAsync(key);
            await this.ping(msg);
        } else {
            await this.troll(msg);
        }
    }


    async troll(msg) {
        return await msg.reply('Stop trolling me.');
    }


    async ping(msg) {
        const startDate = Date.now();
        const response = await msg.reply('ℹ Ping');
        const receivedTime = Date.now();

        const ping = Math.max(0, (response.createdAt.getTime() - startDate));
        const delay = (receivedTime - startDate) - ping;
        const delayStr = delay >= 0 ? `+${delay}` : `${delay}`;

        this.play(response, 500, [
            'ℹ __**P**__ing',
            'ℹ __**Pi**__ng',
            'ℹ __**Pin**__g',
            'ℹ __**Ping**__',
            `ℹ **Pong** - \`${ping}ms\` (\`${delayStr}ms\`)`
        ]);
    }


    play(msg, delay, list) {
        if (list.length < 1) {
            return;
        }

        let next = list.shift();
        let start = this.now();

        msg.edit(next).then(() => {
            let elapsed = this.now() - start;

            setTimeout(() => {
                this.play(msg, delay, list);
            }, Math.max(50, delay - elapsed));
        });
    }


    now() {
        const now = process.hrtime();

        const seconds = now[0] * 1e3;
        const nanoseconds = now[1] / 1e6

        return seconds + nanoseconds;
    }
}

export default new PingCommand();
