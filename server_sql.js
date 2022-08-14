const express = require('express');
const coinRouter = require('./api/routes/coin_sql.routes');
const userRouter = require('./api/routes/user_sql.routes');
const purchaseCoinRouter = require('./api/routes/purchaseCoin.routes')
const billingRouter = require('./api/routes/billing.routes');
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

app.use('/purchasecoin',purchaseCoinRouter)

app.use('/coins',coinRouter)

app.use('/users',userRouter)

app.use('/bill',billingRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , 'public' , 'index.html'))
})

