const mongoose = require('mongoose');
const validator = require('validator');


try {
  mongoose.connect('mongodb+srv://ubeus-market:%40%23Phone123@cluster0.xknsv.mongodb.net/ubeus-market-api?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },() =>
    console.log("connected"));
  //mongoose.set('useFindAndModify', false);
} catch (e) {
   console.log("could not connect");
}
console.log(process.env.MONGODB_URL);
//mongodb+srv://ubeus-market:%40%23Phone123@cluster0.xknsv.mongodb.net/ubeus-market-api?retryWrites=true&w=majority

//'mongodb://127.0.0.1:27017/ubeus-market-api'
