// $ID: index.js, 23 Jan 2018, 13:03, Leonid 'n3o' Knyazev $

class Colors {
    constructor() {
        // @field name
        Object.defineProperty(this, 'name', {
            value: 'Colors'
        });

        // @field colors
        Object.defineProperty(this, 'colors', {
            value: [
                0xff269a,
                0x00ff00,
                0x00e828,
                0x08f8ff,
                0xf226ff,
                0xff1C8e,
                0x68ff22,
                0xffbe11,
                0x2954ff,
                0x9624ed,
                0xa8ed00
            ]
        });
    }

    random() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}

export default new Colors();
