const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// INITIALIZE DB
require('./initDB')();

// MAIN URIs
const userRoutes = require('./routes/userRoutes');
app.use("/users", userRoutes);

const employeeRoutes = require('./routes/employeeRoutes');
app.use("/employees", employeeRoutes)

//404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`API is now online at port ${port} ...`));