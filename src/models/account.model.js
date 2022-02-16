/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const accountSchema = mongoose.Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    accountBalance: {
      type: String,
      default: '0'
    },
    notifications: [{
      title: { type: String },
      body: { type: String },
    }],
  },
  {
    timestamps: true,
  },
);


accountSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  try {
    email.toLowerCase();
    const account = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!account;
  } catch (e) {
    console.log(e);
  }

};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
accountSchema.methods.isPasswordMatch = async function (password) {
  const account = this;
  return bcrypt.compare(password, account.password);
};

accountSchema.pre('save', async function (next) {
  const account = this;
  if (account.isModified('password')) {
    account.password = await bcrypt.hash(account.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const Account = mongoose.model('Account', accountSchema);




module.exports = Account;
