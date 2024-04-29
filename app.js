var express = require('express');
var app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const routes = require('./routes');
app.use('/api/v1', routes);


// 500 error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

// 404 error handler
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});

module.exports = app;
