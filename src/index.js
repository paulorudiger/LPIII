const express = require("express");
const app = express();
const port = 3000;
require('./services/swagger.js')


app.get('/', (req, res) => { res.send('Hello World!'); });

app.listen(port, () => {
    console.log(`aplicação rodando na porta ${port}`);
});