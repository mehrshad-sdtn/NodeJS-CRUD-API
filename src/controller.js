const express = require('express');
const app = express();
const Joi = require('joi');


app.use(express.json());

const wallets = [];


function validateWallet(wallet) {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
    });
    return schema.validate(wallet);
}

function validateCoin(coin) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        symbol: Joi.string().min(2).required(),
        amount: Joi.number().required(),
        rate: Joi.number().required()
    });
    return schema.validate(coin);
}


// ------------------------ wallet controllers ---------------------

exports.getWallets = (req, res) => {
    resp = {
        size: wallets.length,
        wallets: wallets,
        code: 200,
        message: "All wallets received successfully!"
    };
    res.send(resp);
};

//--------------------------------------------
exports.putWallets = (req, res) => {
    const wallet = wallets.find(
        w => w.name === req.params.wname
        );

    if (wallet === undefined) 
    {   
        return res.status(404).send('wallet not found');
    }
 
    const {error} = validateWallet(req.body);
    if (error !== undefined) {
         res.status(400).send(error.details[0].message);
         return;
    }
    //update course
    wallet.name = req.body.name;

    resp = Object.assign({}, wallet);;
    res.send(
        Object.assign(resp, {
            last_updated: constructTime(),
            code: "200",
            message: "Wallet name changed successfully!"
        })
        );
};

//------------------------------------------------------
exports.postWallets = (req, res) => {
 
    const {error} = validateWallet(req.body);

    if (error !== undefined) {
        res.status(400).send(error.details[0].message);
        return;
    }

    time = constructTime();
    const wallet = {
        name: req.body.name,
        balance: 0.0,
        coins: [],
        last_updated: time
    }; 
    wallets.push(wallet);

    resp = Object.assign({}, wallet);
    res.send(
        Object.assign(resp, {
            code: "200", 
            message: "Wallet added successfully!"
        })
        );
};

//------------------------------------------------------------
exports.deleteWallets = (req, res) => {
    const wallet = wallets.find(
        w => w.name === req.params.wname
        );

    if (wallet === undefined) 
    {   
        return res.status(404).send('wallet not found');
    }

   //delete
   const index = wallets.indexOf(wallet);
   wallets.splice(index, 1);
   
   //resp
   resp = Object.assign({}, wallet);;
    res.send(
        Object.assign(resp, {
            last_updated: constructTime(),
            code: "200", 
            message: "Wallet deleted (logged out) successfully!"
        })
        );
   
};

//---------------------- coin controllers -------------

exports.postCoins = (req, res) => {
    const wallet = wallets.find(w => w.name = req.params.wname);
    const {error} = validateCoin(req.body);

    if (error !== undefined) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const coin = {
        name: req.body.name,
        symbol: req.body.symbol,
        amount: parseFloat(req.body.amount),
        rate: parseFloat(req.body.rate)
    };

    wallet.coins.push(coin);

    resp = Object.assign({}, coin);
    res.send(
        Object.assign(resp, {
            code: "200", 
            message: "Coin added successfully!"
        })
    );

};

//--------------------------------------------
exports.getCoins = (req, res) => {
    
    const wallet = wallets.find(w => w.name === req.params.wname);
    
    resp = Object.assign({}, wallet);
    res.send(
        Object.assign(resp, {
            code: "200", 
            message: "All coins recieved successfully!"
        })
    );
    
};

//-----------------------utils------------------------

function constructTime() {
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);

    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    let year = date_ob.getFullYear();

    let hours = date_ob.getHours();
 
    let minutes = date_ob.getMinutes();
    
    let seconds = date_ob.getSeconds();

    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes);

}