import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar is-horizontal level">
    <title className="is-size-1 navbar-brand site-logo">Stock Breaker</title>
    <nav className="navbar-end level-item">
      {isLoggedIn ? (
        <div className="level-item">
          {/* The navbar will show these links after you log in */}
          <Link className="nav-item level-item" to="/home">
            Home
          </Link>
          <Link className="nav-item level-item" to="/portfolio">
            Portfolio
          </Link>
          <Link className="nav-item level-item" to="/transactions">
            Transactions
          </Link>
          <a className="nav-item level-item" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
