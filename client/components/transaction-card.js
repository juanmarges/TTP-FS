import React from 'react';

const utils = require('../../constants');

const TransactionCard = props => {
  const {transaction} = props;
  return (
    <tr className="columns">
      <td className="column">{transaction.symbol.toUpperCase()}</td>
      <td className="column">{`${transaction.shares} shares`}</td>
      <td className="column">
        Purchase Price: {utils.toDollars(transaction.purchasePrice)}
      </td>
      <td className="column">
        Date of Purchase: {transaction.createdAt.slice(0, 10)}
      </td>
      <hr />
      <br />
    </tr>
  );
};

export default TransactionCard;
