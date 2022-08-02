const express = require('express');
// const CoinRouter = require('./api/routes/Coin.routes');
// const UserRouter = require('./api/routes/user.routes');
const buyCoinRouter = require('./api/routes/buyCoin.routes')
const mysql = require('mysql')
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT || 3000;

app.listen(PORT );
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/buycoin',buyCoinRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , 'public' , 'index.html'))
})

