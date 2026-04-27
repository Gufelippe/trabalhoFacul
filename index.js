// Carrega variáveis do arquivo .env (apenas em desenvolvimento local)
require('dotenv').config();

const express = require('express');
const app = express();

// Middleware CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(express.json());

const PORT = process.env.PORT || 3000;

const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
