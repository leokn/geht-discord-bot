// $ID: index.js, 30 Jan 2018, 19:23, Leonid 'n3o' Knyazev $

import { Embed } from '../../base';
import StringUtils from '../String';

class Messenger {
    /**
     * @send
     */
    static send(channel, content) {
        return channel.send({ embed: this.embed(content) }).catch(() => null);
    }


    /**
     * @embed
     */
    static embed(content) {
        const { title = null, description = null, footer = null, color = null } = content;

        const embed = new Embed();

        if (!StringUtils.isNullOrWhiteSpace(title)) {
            embed.setTitle(title);
        }

        if (!StringUtils.isNullOrWhiteSpace(description)) {
            embed.setDescription(description);
        }

        if (!StringUtils.isNullOrWhiteSpace(footer)) {
            embed.setFooter(footer);
        }

        if (color !== null) {
            embed.setColor(color);
        }

        return embed;
    }
}

export default Messenger;
