import express from 'express';
import cors from 'cors';

import {checkUrl, checkEmpty} from './validate.js';

const app = express();

app.use(express.json());
app.use(cors());


/* Variáveis Globais */
let users = [];
let tweets = [];


/* Rota de Cadastro*/
app.post('/sign-up', (req, res) => {

    if( checkEmpty(req.body.username) &&  checkUrl(req.body.avatar) ){ //Valida se campos estão vazios e URL do avatar

        users.push(req.body);

        res.status(201).send("OK");
        
    }else{

        res.status(400).send("Todos os campos são obrigatórios!");
    }    
});

/* Rota que salva novo Tweet*/
app.post('/tweets', (req, res) => {

    if( checkEmpty(req.body.tweet) && checkEmpty( req.header('User') ) ){ //Valida se campos estão vazios

        tweets.push({
            tweet: req.body.tweet, 
            username: req.header('User')
        });

        res.status(201).send("OK");
    }else{

        res.status(400).send("Todos os campos são obrigatórios!");
    } 
});

/* Rota que lista  Tweets*/
app.get('/tweets', (req, res) => {    


    let page = req.query.page;

    if(page && parseInt(page) > 0 ){

    


        let tweetsWithAvatar = tweets.map(function(tweet){//Relaciona avatar do usuário ao tweet
            
            let filteredUser = users.filter( usr => usr.username == tweet.username );//Fiiltra altor do tweet

            return {
                username: tweet.username, 
                avatar: filteredUser[0].avatar,
                tweet: tweet.tweet
            };
        });

        res.send(tweetsWithAvatar.reverse().slice( (page*10)-10 , (page*10) ));//Paginação
    }else{
        res.status(400).send("Informe uma página válida!");
    }

});

app.listen(5000, '127.0.0.1');