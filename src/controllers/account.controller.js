const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const accountService = require('../services/account.service');


const createAccount = catchAsync(async (req, res) => {
    const resp = await accountService.createAccount(req.body);

    res.status(httpStatus.CREATED).send({ message: `Account created.`,data:resp, status: true });
});

const getAccount = catchAsync(async (req, res) => {
  const { _id } = req.accountData;
  const resp = await accountService.getAccount(_id);

  res.status(httpStatus.CREATED).send({ message: 'fetched successfully', data: resp, status: true });
});

const loginAccount = catchAsync(async (req, res) => {
  const resp = await accountService.loginAccount(req.body);
  res.status(httpStatus.CREATED).send({ ...resp, status: true });
});


const topUp = catchAsync(async (req, res) => {
  const { _id } = req.accountData;
  const {amount } = req.body;

  const resp = await accountService.topUp( _id,amount);

  res.status(httpStatus.CREATED).send({data: resp, status: true });
});

const buyTicket = catchAsync(async (req, res) => {
  const { _id } = req.accountData;

  const resp = await accountService.buyTicket(_id);

  res.status(httpStatus.CREATED).send({ data: resp, status: true });
});

const dashboardInfo = catchAsync(async (req, res) => {
  const { _id } = req.accountData;

  const resp = await accountService.dashboardInfo(_id);

  res.status(httpStatus.CREATED).send({ ...resp, status: true });
});

const viewNotification = catchAsync(async (req, res) => {
  const { _id } = req.accountData;

  const resp = await accountService.viewNotification(_id);

  res.status(httpStatus.CREATED).send({ ...resp, status: true });
});



module.exports = {
  createAccount,
  getAccount,
  loginAccount,
  topUp,
  buyTicket,
  dashboardInfo,
  viewNotification
};
