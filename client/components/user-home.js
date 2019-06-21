import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name, balance} = props;

  return (
    <div>
      <h3>Welcome, {name}</h3>
      <h3>Your current balance is $ {balance / 100}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    balance: state.user.balance
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string,
  balance: PropTypes.number
};
