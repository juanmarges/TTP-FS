import React from 'react';
import {connect} from 'react-redux';
import {buyStock} from '../store';

const utils = require('../../constants');

const BuyForm = props => {
  const {balance, error, handleSubmit} = props;
  return (
    <div>
      <h3>Cash - {utils.toDollars(balance)}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="symbol">
            <small>Symbol</small>
          </label>
          <input name="symbol" type="text" />
        </div>
        <div>
          <label htmlFor="shares">
            <small>Shares</small>
          </label>
          <input name="shares" type="text" />
        </div>
        <div>
          <button type="submit">Buy</button>
        </div>
      </form>
      {error && error.response && <div> {error.response.data} </div>}
    </div>
  );
};

const mapState = state => {
  return {
    balance: state.user.balance,
    id: state.user.id
  };
};

const mapBuy = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const symbol = evt.target.symbol.value;
      const shares = evt.target.shares.value;
      console.log(symbol);
      dispatch(buyStock(symbol, shares));
    }
  };
};
export default connect(mapState, mapBuy)(BuyForm);
