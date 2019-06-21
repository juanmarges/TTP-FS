import axios from 'axios';

const utils = require('../../constants');

/**
 * ACTION TYPES
 */
const GET_STOCKS = 'GET_STOCKS';
const GET_CURRENT_PRICES = 'GET_CURRENT_PRICES';
const ADD_STOCK = 'ADD_STOCK';

/**
 * INITIAL STATE
 */
const defaultStocks = [];

/**
 * ACTION CREATORS
 */
const getStocks = stocks => ({type: GET_STOCKS, stocks});
const getCurrentPrices = prices => ({type: GET_CURRENT_PRICES, prices});
const addStock = stock => ({type: ADD_STOCK, stock});

/**
 * THUNK CREATORS
 */

export const loadCurrentPrices = symbols => async dispatch => {
  try {
    const iexCheck = await axios.get(`${utils.iexBase}${symbols.join(',')}`);
    let prices = {};
    for (let key in iexCheck.data) {
      const stock = key.toLowerCase();
      prices[stock] = [
        iexCheck.data[key].quote.open * 100,
        iexCheck.data[key].quote.latestPrice * 100
      ];
    }
    dispatch(getCurrentPrices(prices));
  } catch (err) {
    console.error(err);
  }
};

export const loadStocks = () => async dispatch => {
  try {
    const res = await axios.get('/api/stocks/');
    dispatch(getStocks(res.data || defaultStocks));
    const symbols = res.data.map(stock => stock.symbol);
    dispatch(loadCurrentPrices(symbols));
  } catch (err) {
    console.error(err);
  }
};

export const buyStock = (symbol, shares) => async dispatch => {
  try {
    const iexCheck = await axios.get(`${utils.iexBase}${symbol}`);
    if (iexCheck.status === 404) {
      alert(`Stock ${symbol} not found`);
    } else {
      const iexData = iexCheck.data[symbol.toUpperCase()].quote;
      const purchasePrice = iexData.latestPrice;
      var buy = confirm(
        `${shares} shares of ${symbol} will cost ${purchasePrice} each.\nDo you still want to purchase?`
      );
      if (buy) {
        const res = await axios.post('/api/stocks/buy', {
          symbol,
          shares,
          purchasePrice
        });
        let stock = res.data;
        stock.openPrice = iexData.open * 100;
        stock.latestPrice = iexData.latestPrice * 100;
        dispatch(addStock(stock));
      }
    }
  } catch (err) {
    console.error(err);
  }
};
/**
 * REDUCER
 */
export default function(state = defaultStocks, action) {
  let currentState = [...state];
  switch (action.type) {
    case GET_STOCKS:
      return action.stocks;
    case GET_CURRENT_PRICES:
      currentState.forEach(stock => {
        stock.openPrice = action.prices[stock.symbol][0];
        stock.latestPrice = action.prices[stock.symbol][1];
      });
      return currentState;
    case ADD_STOCK:
      const symbolIndex = currentState
        .map(stock => stock.symbol)
        .findIndex(symbol => symbol === action.stock.symbol);
      if (symbolIndex > -1) currentState[symbolIndex] = action.stock;
      else currentState.push(action.stock);
      return currentState;
    default:
      return state;
  }
}
