import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SharesPage, BuyForm} from './index'
import {loadStocks, loadCurrentPrices} from '../store'

/**
 * COMPONENT
 */
class Portfolio extends Component {
  componentDidMount() {
    this.props.onLoadStocks(this.props.userId)
  }

  render() {
    return (
      <div>
        <SharesPage />
        <BuyForm />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    stocks: state.stocks
  }
}

const mapDispatch = dispatch => {
  return {
    onLoadStocks(userId) {
      dispatch(loadStocks(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Portfolio)
