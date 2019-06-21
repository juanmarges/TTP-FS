import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SharesPage, BuyForm} from './index'
import {loadStocks} from '../store'

/**
 * COMPONENT
 */
class Portfolio extends Component {
  componentDidMount() {
    this.props.onLoadStocks()
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

const mapDispatch = dispatch => {
  return {
    onLoadStocks() {
      dispatch(loadStocks())
    }
  }
}

export default connect(null, mapDispatch)(Portfolio)
