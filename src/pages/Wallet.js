import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <h5 data-testid="email-field">{ email }</h5>
          <h5 data-testid="total-field">0</h5>
          <h5 data-testid="header-currency-field">BRL</h5>
        </header>
        asdf
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ email: user.email });

Wallet.propTypes = {
  email: propTypes.string,
}.isRequire;

export default connect(mapStateToProps)(Wallet);
