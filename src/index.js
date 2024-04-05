const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const cookieParser = require('cookie-parser');

app.use(cookieParser());

// posteriormente vai para o /login
app.get('/', (req,res) => {
    res.cookie('meuCookie2024', 'abcde');
    res.send('Hello World!'); 
});

require('./services/swagger.js')

require('./routes')(app)
app.get('/', (req, res) => { res.status(200).send('Hello World!'); });

app.use('/v1/docs', express.static('src/views'))
app.use('/docs/swagger.yaml', express.static('src/docs/swagger.yaml'))

app.listen(port, () => {
    console.log(`aplicação rodando na porta ${port}`);
});