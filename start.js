// $ID: index.js, Wed, 10 Jan 2018 17:15:15, Leonid 'n3o' Knyazev $

if (process.env.NODE_ENV === 'production') {
    require('./app');
} else {
    require('babel-register');
    require('./src');
}
