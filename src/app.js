const express = require('express');
const app = express();
const controller = require('./controller');

app.use(express.json());


app.get('/', (req, res) => {  res.send('Hello!'); });

app.post('/:wname/coins', controller.postCoins);

app.get('/wallets', controller.getWallets);

app.get('/:wname', controller.getCoins);

app.put('/wallets/:wname', controller.putWallets);

app.put('/:wname/:symbol', controller.putCoins);

app.post('/wallets', controller.postWallets);

app.delete('/wallets/:wname', controller.deleteWallets);

app.delete('/:wname/:symbol', controller.deleteCoins);




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port} ...`);
});