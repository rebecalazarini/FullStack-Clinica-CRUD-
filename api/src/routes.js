const express = require('express');
const routes = express.Router();

const Consulta = require('./controllers/consulta');//Pra criar escreve consulta.js depois pode tirar o .js

routes.get('/', (req, res) =>{
    res.json({titulo: 'Clinica Santa Maria'});
});

routes.post('/consultas', Consulta.create);
routes.get('/consultas', Consulta.read);
routes.delete('/consultas/:id', Consulta.deletar);
routes.put('/consultas/:id', Consulta.update);

module.exports = routes;