const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Initial endpoint to test the server
app.get('/', (req, res) => {
    res.status(200).send('Hola Mundo');
});

module.exports = app;