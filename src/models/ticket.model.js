/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');


const ticketSchema = mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    ticketNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Ticket = mongoose.model('Ticket', ticketSchema);




module.exports = Ticket;
