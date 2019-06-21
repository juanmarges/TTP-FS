import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {TransactionCard} from './index'
import {loadTransactions} from '../store'

const utils = require('../../constants')

class Transactions extends Component {
  componentDidMount() {
    this.props.onLoadTransactions()
  }

  render() {
    const {transactions, total} = this.props
    return (
      <div>
        <h3>Transactions</h3>
        {transactions.length > 0 ? (
          transactions.map(transaction => (
            <TransactionCard
              key={`trans-${transaction.symbol}-${transaction.id + 1000}`}
              transaction={transaction}
            />
          ))
        ) : (
          <h3>You currently have no transactions</h3>
        )}
        <h3>Total {utils.toDollars(total)}</h3>
      </div>
    )
  }
}

const mapTransactions = state => {
  return {
    transactions: state.transactions,
    total: utils.totalTransactions(state.transactions)
  }
}

const mapDispatch = dispatch => {
  return {
    onLoadTransactions() {
      dispatch(loadTransactions())
    }
  }
}

export default connect(mapTransactions, mapDispatch)(Transactions)

Transactions.propTypes = {
  transactions: PropTypes.array,
  total: PropTypes.number
}
