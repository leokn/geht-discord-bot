// $ID: Constants.js, 18 Jan 2018, 20:22, Leonid 'n3o' Knyazev $

// Events.
class Events {
    constructor() {
        // @field name
        Object.defineProperty(this, 'name', {
            value: 'Events'
        });
    }
}


// Colors.
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


// Constants.
class Constants {
    constructor() {
        // @field name
        Object.defineProperty(this, 'name', {
            value: 'Constants'
        });
    }
}


// Exports
const events = new Events();
const colors = new Colors();
const constants = new Constants();

export {
    events as Events,
    colors as Colors,
    constants as Constants
};
