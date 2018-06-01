let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let session = require('express-session');
// let uniqueIdGenerator = require('../utils/helpers').uniqueIdGenerator;
const database = require('./database.js');


// console.log(`pi${uniqueIdGenerator()}vii`)
database.connect().catch((error) => {
    process.exit()
});

let app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: `youtubeQuizApi`,    
}))
app.use(expressValidator());

app.use(express.static('./app/public'));

app.use((req, res, next) => { //next é usado para dar continuação no fluxo da aplicação
    res.setHeader('Access-Control-Allow-Origin', '*'); //Habilita requisições de dominios diferentes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); //Pré-configura quais métodos podem ser usados
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, url'); //Habilita que a requisição efetuada pela origem tenha cabeçalhos (headers) reescritos
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

consign()
    .then('/routes')
    .then('/models')
    .then('/utils')
    .then('/controllers')
    .into(app);

module.exports = app;