import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { resetToken } from '../redux/actions/auth';
import '../styles/header.css';

function Header({ token, history, resetToken }) {
  function logOut() {
    if (!token) {
      history.push('/login')
    } else {
      resetToken();
    }
  }

  return (
    <div className="header">
      <Link to="/" className="nav-link">Home</Link>
      <span onClick={logOut}>{token ? 'Logout' : 'Login'}</span>
    </div>
  );
}

Header.propTypes = {
  token: PropTypes.string,
  history: PropTypes.object,
  resetToken: PropTypes.func
};

export default withRouter(connect(
  state => ({
    token: state.user.token
  }),
  dispatch => ({
    resetToken: () => {
      dispatch(resetToken());
    }
  })
)(Header));
