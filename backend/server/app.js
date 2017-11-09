const express = require('express');
const sequelize = require('sequelize');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db/models');
const vehicles = require('./routes/vehiclesRoute');
const sales = require('./routes/salesRoute');
const customers = require('./routes/customersRoute');

db.sequelize.sync();
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.status(200).send('Hello!');
});

app.use('/api/vehicles', vehicles);
app.use('/api/customers', customers);
app.use('/api/sales', sales);

module.exports = app;