const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Stock.buy = async function(symbol, shares) {
  let stock
  stock = await Stock.findOne({
    where: {
      symbol: symbol
    }
  })
  if (stock) {
    await stock.update({
      shares: stock.shares + shares
    })
    await stock.save()
  } else {
    stock = await Stock.create({symbol, shares})
  }
  return stock
}

module.exports = Stock
