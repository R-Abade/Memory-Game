const express = require('express'); //muito mais simples que utilizar writeHead;
const port = 3000;
const server = express();
const fs = require('fs');
const path = require('path');

server.use(express.static(path.join('Atividade1'))); //serve os estáticos

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});