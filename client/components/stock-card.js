import React from 'react';

const utils = require('../../constants');

const StockCard = props => {
  const {stock} = props;
  return (
    <div>
      <h4>{`${stock.symbol.toUpperCase()} - ${stock.shares}`}</h4>
      <h5>Open Price: {utils.toDollars(stock.openPrice)}</h5>
      <h5>Current Price: {utils.toDollars(stock.latestPrice)}</h5>
      <br />
    </div>
  );
};

export default StockCard;
