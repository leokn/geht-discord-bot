// $ID: start.js, 17 Jan 2018, 14:55, Leonid 'n3o' Knyazev $

const ENVIRONMENT = process.env.NODE_ENV || 'development';

if (!process.env.NODE_ENV || process.env.NODE_ENV === '') {
    process.env.NODE_ENV = ENVIRONMENT;
}

if (ENVIRONMENT === 'production') {
    require('./build');
} else {
    require('babel-register');
    require('./source');
}
