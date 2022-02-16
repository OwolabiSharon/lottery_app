const express = require('express');
const cors = require('cors');
const { errorConverter, errorHandler } = require('./middlewares/error');
const accountService = require('./services/account.service');
const bodyParser = require("body-parser");
const path = require("path");

require('dotenv/config')
require('./config/database')
const AccountModel = require('./models/account.model');

const createMain = async () => {
  const mainAccount =  await AccountModel.findOne({ email:'ubeussharexy@gmail.com' });

  if (mainAccount === null) {
    const data = {
    "accountName" : "main",
    "email" : "ubeussharexy@gmail.com",
    "password" : "@#Phone123",
    "phoneNumber" : "08054535044",
    };
    console.log("ff");
    return AccountModel.create(data);
  }

};
createMain()
const getAccount = async (_id) => {
  const account = await AccountModel.findOne({ _id });

  return account;
};

accountService.pickWinner();

const accountRouter = require('./routes/account.route');
// const storeRouter = require('./routers/stores');
// const productRouter = require('./routers/products');

//timer

const app = express()
const port = process.env.PORT || 3000

//run this evry time timer

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());


app.use(express.json())
 app.use(accountRouter)
// app.use(storeRouter)
// app.use(productRouter)

app.use(errorConverter);

// handle error
app.use(errorHandler);


app.listen(port, () => {
  console.log('server is up '+ port);
})
