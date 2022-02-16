const express = require('express');
const validate = require('../middlewares/validate');
const accountValidation = require('../validations/account.validation');
const accountController = require('../controllers/account.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(validate(accountValidation.createAccount),accountController.createAccount)

router
  .route('/getAccount')
  .get(auth,accountController.getAccount);

router
  .route('/login')
  .post(validate(accountValidation.login),accountController.loginAccount);

router
  .route('/topUp')
  .post(validate(accountValidation.topUp),auth,accountController.topUp);

router
  .route('/buyTicket')
  .post(auth,accountController.buyTicket);

router
  .route('/dashboardInfo')
  .post(auth,accountController.dashboardInfo);

router
  .route('/viewNotification')
  .post(auth,accountController.viewNotification);



module.exports = router;
