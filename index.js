const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

global.config = require('./app/config');
global.params = require('./app/params');

const {database, port, path} = config;

// Connect to DB
mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

const router = require('./app/router');
const jwtAuth = require(`${path.middleware}/jwtAuth`);

app.use('/', jwtAuth, router);

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
});