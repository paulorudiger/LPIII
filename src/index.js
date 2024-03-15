const express = require("express");
const app = express();
const port = 3000;
require('./services/swagger.js')

require('./routes')(app)
app.get('/', (req, res) => { res.status(200).send('Hello World!'); });

app.use('/v1/docs', express.static('src/views'))
app.use('/docs/swagger.yaml', express.static('src/docs/swagger.yaml'))

app.listen(port, () => {
    console.log(`aplicação rodando na porta ${port}`);
});