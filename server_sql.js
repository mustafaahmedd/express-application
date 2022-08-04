const express = require('express');
const CoinRouter = require('./api/routes/coin_sql.routes');
// const UserRouter = require('./api/routes/user_sql.routes');
const buyCoinRouter = require('./api/routes/buyCoin.routes')
const mysql = require('mysql')
const path = require('path');
const bodyParser = require('body-parser');
const coinSqlRouter = require('./api/routes/coin_sql.routes');
const app = express()
const PORT = process.env.PORT || 3000;

app.listen(PORT );
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/buycoin',buyCoinRouter)

app.use('/coins',CoinRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , 'public' , 'index.html'))
})

