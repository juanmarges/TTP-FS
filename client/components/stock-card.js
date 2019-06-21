import React from 'react';

const utils = require('../../constants');

const StockCard = props => {
  const {symbol, shares, openPrice, latestPrice} = props.stock;
  return (
    <tr className="columns">
      <td className="column">{symbol.toUpperCase()}</td>
      <td className="column">{`${shares} Shares`}</td>
      <td className="column">Open Price: {utils.toDollars(openPrice)}</td>
      <td className={`column ${utils.stockColor(openPrice, latestPrice)}`}>
        Current Price: {utils.toDollars(latestPrice)}
      </td>
      <br />
      <hr />
    </tr>
  );
};

export default StockCard;
