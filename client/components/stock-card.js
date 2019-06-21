import React from 'react'

const utils = require('../../constants')

const StockCard = props => {
  const {stock} = props
  return (
    <div>
      <h4>{`${stock.symbol.toUpperCase()} - ${
        stock.shares
      } shares ${utils.toDollars(stock.purchasePrice)}`}</h4>
      <h5>Purchase Price: {utils.toDollars(stock.purchasePrice)}</h5>
      <h5>Current Price: {utils.toDollars(stock.currentPrice)}</h5>
      <br />
    </div>
  )
}

export default StockCard
