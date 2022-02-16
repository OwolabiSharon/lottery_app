const Joi = require('joi');


const createAccount = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    accountName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    }),
};

const topUp = {
  body: Joi.object().keys({
    amount: Joi.string().required(),
  }),
};





module.exports = {
  createAccount,
  login,
  topUp,
};
