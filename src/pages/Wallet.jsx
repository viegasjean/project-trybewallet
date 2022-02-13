import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchExchangeRateAction from '../actions';
import Form from '../components/Form';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <Form />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchExchangeRateAction()),
}
);

Wallet.propTypes = {
  email: propTypes.string,
}.isRequire;

export default connect(null, mapDispatchToProps)(Wallet);
