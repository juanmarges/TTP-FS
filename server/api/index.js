const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/stocks', require('./stocks'))

router.get('/transactions', async (req, res, next) => {
  try {
    const {Transaction} = require('../db/models')
    const user = req.user
    const transactions = await Transaction.findAll({
      where: {
        userId: user.id
      }
    })
    res.send(transactions)
  } catch (err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
