import axios from 'axios'
import history from '../history'

const utils = require('../../constants')

/**
 * ACTION TYPES
 */
const GET_STOCKS = 'GET_STOCKS'
const GET_CURRENT_PRICES = 'GET_CURRENT_PRICES'
const ADD_STOCK = 'ADD_STOCK'

/**
 * INITIAL STATE
 */
const defaultStocks = []

/**
 * ACTION CREATORS
 */
const getStocks = stocks => ({type: GET_STOCKS, stocks})
const getCurrentPrices = prices => ({type: GET_CURRENT_PRICES, prices})
const addStock = stock => ({type: ADD_STOCK, stock})

/**
 * THUNK CREATORS
 */

export const loadCurrentPrices = symbols => async dispatch => {
  try {
    const iexCheck = await axios.get(`${utils.iexBase}${symbols.join(',')}`)
    console.log(iexCheck.data)
    let prices = {}
    for (let key in iexCheck.data) {
      const stock = key.toLowerCase()
      prices[stock] = iexCheck.data[key].quote.latestPrice * 100
    }
    dispatch(getCurrentPrices(prices))
  } catch (err) {
    console.error(err)
  }
}

export const loadStocks = () => async dispatch => {
  try {
    const res = await axios.get('/api/stocks/')
    dispatch(getStocks(res.data || defaultStocks))
    const symbols = res.data.map(stock => stock.symbol)
    dispatch(loadCurrentPrices(symbols))
  } catch (err) {
    console.error(err)
  }
}

export const buyStock = (symbol, shares) => async dispatch => {
  try {
    const iexCheck = await axios.get(`${utils.iexBase}${symbol}`)
    if (iexCheck.status === 404) {
      alert(`Stock ${symbol} not found`)
    } else {
      const purchasePrice =
        iexCheck.data[symbol.toUpperCase()].quote.latestPrice
      var buy = confirm(
        `${shares} shares of ${symbol} will cost ${purchasePrice} each.\nDo you still want to purchase?`
      )
      if (buy) {
        const res = await axios.post('/api/stocks/buy', {
          symbol,
          shares,
          purchasePrice
        })
        dispatch(addStock(res.data))
      }
    }
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultStocks, action) {
  let currentState = [...state]
  switch (action.type) {
    case GET_STOCKS:
      return action.stocks
    case GET_CURRENT_PRICES:
      currentState.forEach(stock => {
        console.log('before ', stock)
        stock.currentPrice = action.prices[stock.symbol]
        console.log('after ', stock)
      })
      return currentState
    case ADD_STOCK:
      const symbolIndex = currentState
        .map(stock => stock.symbol)
        .findIndex(action.stock.symbol)
      if (symbolIndex > -1) currentState[symbolIndex] = action.stock
      else currentState.push(action.stock)
      return currentState
    default:
      return state
  }
}
