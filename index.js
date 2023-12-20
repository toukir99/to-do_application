/*
    Project: To-Do Applicaiton
    Author: Toukir Ahmed
    Date: Dec, 2023
*/

const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

const app = express();
app.use(express.json());

mongoose
    .connect('mongodb://127.0.0.1:27017/todos')
    .then(() => console.log('Connection to the database successful'))
    .catch((err) => console.error('Error connecting to the database:', err));

app.use('/todo', todoHandler);
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err.message });
}

app.use(errorHandler);

app.listen(3000, () => {
    console.log('app listening at port 3000');
});
