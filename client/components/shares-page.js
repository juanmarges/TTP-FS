import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {StockCard} from './index'

const utils = require('../../constants')

const SharesPage = props => {
  const {stocks, total} = props
  return (
    <div>
      <h3>Portfolio ({utils.toDollars(total)})</h3>
      {stocks.length > 0 ? (
        stocks.map(stock => (
          <StockCard key={`stk-${stock.symbol}-${stock.id}`} stock={stock} />
        ))
      ) : (
        <h3>You currently have no shares</h3>
      )}
    </div>
  )
}

const mapShares = state => {
  return {
    stocks: state.stocks,
    total: utils.totalPortfolio(state.stocks)
  }
}

export default connect(mapShares)(SharesPage)

SharesPage.propTypes = {
  stocks: PropTypes.array,
  total: PropTypes.number
}
