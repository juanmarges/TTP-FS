import React from 'react';

const utils = require('../../constants');

const TransactionCard = props => {
  const {transaction} = props;
  return (
    <div>
      <h4>{`${transaction.symbol.toUpperCase()} - ${
        transaction.shares
      } shares`}</h4>
      <h5>Purchase Price: {utils.toDollars(transaction.purchasePrice)}</h5>
      <h5>Date of Purchase: {transaction.createdAt.slice(0, 10)}</h5>
      <br />
    </div>
  );
};

export default TransactionCard;
