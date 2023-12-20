/*
    Project: To-Do Applicaiton
    Author: Toukir Ahmed
    Date: Dec, 2023
*/

const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require("./routeHandler/userHandler");
const dotenv = require("dotenv");

const app = express();
dotenv.config()
app.use(express.json());

mongoose
    .connect('mongodb://127.0.0.1:27017/todos')
    .then(() => console.log('Connection to the database successful'))
    .catch((err) => console.error('Error connecting to the database:', err));

app.use('/todo', todoHandler);
app.use("/user", userHandler);

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
