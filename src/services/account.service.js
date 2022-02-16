const httpStatus = require('http-status');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const AccountModel = require('../models/account.model');
const TicketModel = require('../models/ticket.model');

//const { randomString } = require('../utils/utils');


const createAccount = async (userBody) => {

  if (await AccountModel.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.OK, 'Email already taken');
  }
  const data = {
    ...userBody,
  };

  return AccountModel.create(data);
};

const getAccount = async (_id) => {
  const account = await AccountModel.findOne({ _id });

  return account;
};


const pickWinner = async () => {

  const tickets = await TicketModel.find()
  if (tickets.length === 0) {
    const updated = await AccountModel.updateMany(
      { },
      { $set: {notifications:{title:"lottery notification",body:"no user bought tickets"}} },
      { new: true },
    );
    console.log('no user bought tickets');
  }else {

      const random = Math.floor(Math.random() * tickets.length);

      let winner_id = tickets[random].account

      const winner = await AccountModel.findOne({ _id: winner_id });
      console.log(winner);

      const mainAccount =  await AccountModel.findOne({ email:'ubeussharexy@gmail.com' });



      TicketModel.remove( function ( err ) {
            console .log( "success" );
        });

      let mainAccountBalance = parseInt(mainAccount.accountBalance)
      let new_accountBalance = parseInt(winner.accountBalance) + mainAccountBalance

      mainAccountBalance = 0

      new_accountBalance = new_accountBalance.toString()
      mainAccountBalance = mainAccountBalance.toString()

      const updated = await AccountModel.findOneAndUpdate(
        { email: winner.email },
        { $set: { accountBalance: new_accountBalance } },
        { new: true },
      );

      const updatedMain = await AccountModel.findOneAndUpdate(
        { email: mainAccount.email },
        { $set: { accountBalance: mainAccountBalance }},
      );

      console.log(winner);

      const updatedWinner = await AccountModel.updateMany(
        { _id: winner_id },
        { $set: {notifications:{title:"lottery notification",body:"you are the winner!!!"}} },
        { new: true },
      );

      const updatedLosers = await AccountModel.updateMany(
        { _id: { $ne: winner_id } },
        { $set: {notifications:{title:"lottery notification",body:"you are not the winner, enjoy poverty"}} },
        { new: true },
      );

  }
  setTimeout(pickWinner, 60*1000);
};


const loginAccount = async (data) => {
  let { email } = data;
  email = email.toLowerCase();

  const account = await AccountModel.findOne({ email });


  if (!account) {
    throw new ApiError(httpStatus.OK, 'Email or password Invalid');
  }

  const compare = await bcrypt.compare(data.password, account.password);

  if (compare === false) {
    throw new ApiError(httpStatus.OK, 'Email or password invalid');
  }

  const token = jwt.sign(
    {
      email: account.email,
      _id: account._id,
      accountName: account.accountName,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );

  return {
    message: 'Login successful',
    data: {
      token,
      user: {
        email: account.email,
        accountName: account.accountName,
        id: account.id,
      },
    },
  };
};


const topUp = async (_id, amount) => {

  let account = await AccountModel.findOne({ _id });

  let new_accountBalance = parseInt(account.accountBalance) + parseInt(amount)





  const updated = await AccountModel.findOneAndUpdate(
    { _id },
    { $set: { accountBalance: new_accountBalance  } },
    { new: true },
  );


  return {
    message: 'top up successful',
    data: {
      balance:account.accountBalance
      },
    }
};

const buyTicket = async (_id) => {
  const mainAccount =  await AccountModel.findOne({ email:'ubeussharexy@gmail.com' });


  let account = await AccountModel.findOne({ _id });
  if (parseInt(account.accountBalance) < 1000) {
    throw new ApiError(httpStatus.OK, 'you are too broke for this get a job or kill yourself ');
  }



  let new_accountBalance = parseInt(account.accountBalance) - 1000
  let new_mainAccountBalance = parseInt(mainAccount.accountBalance) + 1000



  new_accountBalance = new_accountBalance.toString()
  new_mainAccountBalance = new_mainAccountBalance.toString()




  var firstPart = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  var secondPart = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  ticketNumber = (firstPart + secondPart)

  const data = {
    account: _id,
    ticketNumber:ticketNumber
  };

  const ticket = TicketModel.create(data);


  const updated = await AccountModel.findOneAndUpdate(
    { _id },
    { $set: { accountBalance: new_accountBalance } },
    { new: true },
  );

  const updatedMain = await AccountModel.findOneAndUpdate(
    { email: mainAccount.email },
    { $set: { accountBalance: new_mainAccountBalance }},
  );

  return {
    message: 'ticket bought we hope you win ',
    data: {
      balance: updated.accountBalance
      },
    }
};

const dashboardInfo = async (_id) => {

  const userAccount = await AccountModel.findOne({ _id });
  const mainAccount = await AccountModel.findOne({ email:"ubeussharexy@gmail.com" });

  const tickets = await TicketModel.find()
  const totalTickets = tickets.length

  const userTickets = await TicketModel.find({account:_id})
  const winningOdds = userTickets.length
  const losingOdds = totalTickets - winningOdds



  return {
    message: 'fetched successfully',
    data: {
      accountName: userAccount.accountName,
      balance: userAccount.accountBalance,
      totalPrice: mainAccount.accountBalance,
      winning: winningOdds,
      losing:losingOdds
      },
    }
};

const viewNotification = async (_id) => {

  const user = await AccountModel.findOne({ _id });

  const notifications = user.notifications
  const displayedNotification = user.notifications[0]
  const notificationNumber = user.notifications.length
  const updated = await AccountModel.updateMany(
    { _id },
    { $set: {notifications:[]} },
    { new: true },
  );


  return {
    message: 'fetched successfully',
    data: {
      notifications,
      displayedNotification,
      notificationNumber
      },
    }
};

module.exports = {
  createAccount,
  loginAccount,
  getAccount,
  topUp,
  buyTicket,
  pickWinner,
  dashboardInfo,
  viewNotification
};
