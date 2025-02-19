const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('./src/routes');//Pra criar escreve routes.js depois pode tirar o .js

app.use (cors());
app.use (express.json());
app.use(routes);

app.listen(4000, () => {
    console.log('Rodando certinho em http://localhost:4000');
});

//Pra testar abra o terminal e digite npx nodemon

