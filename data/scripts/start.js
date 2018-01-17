// $ID: start.js, 17 Jan 2018, 14:55, Leonid 'n3o' Knyazev $

if (process.env.NODE_ENV === 'production') {
    require('../../app');
} else {
    require('babel-register');
    require('../../src');
}
