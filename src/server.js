const express = require('express');
const cors = require('cors');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send('Hola Mundo');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});