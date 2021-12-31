const express = require('express');
const app = express();
const controller = require('./controller');

app.use(express.json());


app.get('/', (req, res) => {  res.send('Hello!'); });

app.get('/wallets', controller.getWallets);

app.put('/wallets/:wname', controller.putWallets);

app.post('/wallets', controller.postWallets);

app.delete('/wallets/:wname', controller.deleteWallets);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port} ...`);
});