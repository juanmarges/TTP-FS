const iexBase =
  'https://cloud.iexapis.com/v1/stock/market/batch?token=pk_400a6913ce484ed393927244448ba99b&types=quote&range=1d&last=5&symbols='
const pubKey = 'pk_400a6913ce484ed393927244448ba99b'

function toDollars(pennies) {
  return `$ ${(pennies / 100).toFixed(2)}`
}

function toPennies(dollars) {
  return dollars * 100
}

function totalPortfolio(stocks) {
  return stocks.reduce((total, stock) => {
    total += stock.shares * stock.purchasePrice
    return total
  }, 0)
}

module.exports = {
  iexBase,
  pubKey,
  toDollars,
  toPennies,
  totalPortfolio
}
