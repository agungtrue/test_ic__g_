const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// express init
const app = express();
app.use(express.json());

// cors init
app.use(cors());
app.options('*', cors());

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// routers
const routers = require('./routes');

// router init
app.use(routers);

module.exports = app;