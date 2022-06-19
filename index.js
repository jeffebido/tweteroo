import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
/* Variáveis Globais */

let users = [];




/* Rotas */
app.post('/sign-up', (req, res) => {

    users.push(req.body);
    

    res.send("OK");
});

app.post('/tweets', (req, res) => {


});

app.get('/tweets', (req, res) => {
    
});


app.get('/', (req, res) => { //Rota para testes EXCLUIR DEPOIS
    res.send(users);
});





app.listen(5000, '127.0.0.1');