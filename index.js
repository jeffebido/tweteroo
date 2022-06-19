import express from 'express';
import cors from 'cors';

import {checkUrl, checkEmpty} from './validate.js';

const app = express();
app.use(express.json());
app.use(cors());


/* Variáveis Globais */
let users = [];
let tweets = [];


/* Rotas */
app.post('/sign-up', (req, res) => {

    if( checkEmpty(req.body.username) &&  checkUrl(req.body.avatar) ){

        users.push(req.body);
        res.status(201).send("OK");
    }else{

        res.status(400).send("Todos os campos são obrigatórios!");
    }    
});

app.post('/tweets', (req, res) => {

    if( checkEmpty(req.body.tweet) && checkEmpty( req.header('User') ) ){

        tweets.push({
            tweet: req.body.tweet, 
            username: req.header('User')
        });
        res.status(201).send("OK");
    }else{

        res.status(400).send("Todos os campos são obrigatórios!");
    } 
});

app.get('/tweets', (req, res) => {    

    let tweetsWithAvatar = tweets.map(function(tweet){
        
        let img = users.filter( usr => usr.username == tweet.username );

        return {
            username: tweet.username, 
            avatar: img[0].avatar,
            tweet: tweet.tweet
        };
     });

    res.send(tweetsWithAvatar.reverse().slice(0, 10));
});

app.listen(5000, '127.0.0.1');