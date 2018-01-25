// $ID: default.js, Wed, 10 Jan 2018 20:11:39, Leonid 'n3o' Knyazev $

// config for "development" mode.
const config = {
    "rules": {
        "no-console": "off",
        "no-debugger": "off",
    }
};

// config for "production" mode.
if (process.env.NODE_ENV === 'production') {
    Object.assign(config.rules, {
        "no-console": ["error", {
            "allow": ["warn", "error"]
        }],

        "no-debugger": "error"
    });
}

module.exports = config;
