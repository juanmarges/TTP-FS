const router = require('express').Router()
const {Stock, Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = req.user
    const stocks = await Stock.findAll({
      where: {
        userId: user.id
      }
    })
    res.send(stocks)
  } catch (err) {
    next(err)
  }
})

router.post('/buy', async (req, res, next) => {
  try {
    const user = req.user
    const shares = parseInt(req.body.shares, 10)
    const symbol = req.body.symbol.toLowerCase()
    const purchasePrice = req.body.purchasePrice * 100 * shares
    if (user.balance < shares * purchasePrice) {
      res.status(401).send('Cannot purchase. Not enough cash.')
    } else {
      const stock = await Stock.buy(symbol, shares)
      const transaction = await Transaction.create({
        symbol,
        shares,
        purchasePrice
      })
      await stock.setUser(user)
      await transaction.setUser(user)
      await user.update({
        balance: user.balance - shares * purchasePrice
      })
      await user.save()
      res.send(stock)
    }
  } catch (err) {
    next(err)
  }
})
