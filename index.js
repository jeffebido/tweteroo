import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());


/* Variáveis Globais */
let users = [];
let tweets = [];


/* Rotas */
app.post('/sign-up', (req, res) => {

    users.push(req.body);
    res.send("OK");
});

app.post('/tweets', (req, res) => {

    tweets.push(req.body);
    res.send("OK");
});

app.get('/tweets', (req, res) => {

    let tweetsWithAvatar = tweets.map(function(tweet){

        let img = users.filter( usr => usr.username === tweet.username );

        return {
            username: tweet.username, 
            avatar: img[0].avatar,
            tweet: tweet.tweet
        };
     });
    console.log(users);
    res.send(tweetsWithAvatar.reverse().slice(0, 10));
});

app.listen(5000, '127.0.0.1');