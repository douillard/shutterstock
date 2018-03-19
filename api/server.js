//require('dotenv').config();
require('babel-polyfill');
import express  from 'express';

const app = express();

module.exports = app;

require('./express')(app);
require('./routes')(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
