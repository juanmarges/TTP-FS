const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Transaction;
