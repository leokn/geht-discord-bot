// $ID: default.js, 26 Jan 2018, 12:37, Leonid 'n3o' Knyazev $
'use strict';

// https://www.npmjs.com/package/config
process.env.NODE_CONFIG_ENV = 'config';
process.env.NODE_CONFIG_DIR = './data/config';
process.env.NODE_CONFIG_STRICT_MODE = 'true';
process.env.SUPPRESS_NO_CONFIG_WARNING = 'true';

const config = require('config');

if (config.has('database')) {
    module.exports = Object.assign({}, config.get('database'));
} else {
    module.exports = {};
}


console.log('');
console.log('=====================================================');

console.log(module.exports);

console.log('=====================================================');
console.log('');
