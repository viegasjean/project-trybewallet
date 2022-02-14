import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchExchangeRateAction, { setExpenses, setTotal } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      total: 0,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatchSetValue, exchangeRates, fetchCurrencies } = this.props;
    const { id, value, description, currency, method, tag, total } = this.state;
    fetchCurrencies();
    dispatchSetValue({
      id, value, currency, method, tag, description, exchangeRates,
    });
    this.setState({
      id: id + 1,
      total: total + value * exchangeRates[currency].ask,
      value: '0',
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, exchangeRates } = this.props;
    const { total, value } = this.state;
    return (
      <div>
        <header>
          <h5 data-testid="email-field">{ email }</h5>
          <h5 data-testid="total-field">{ total }</h5>
          <h5 data-testid="header-currency-field">BRL</h5>
        </header>
        <form
          style={ {
            display: 'flex',
            flexDirection: 'column',
          } }
        >
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              name="value"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              { Object.keys(exchangeRates).map((currency) => (
                currency !== 'USDT' && <option key={ currency }>{ currency }</option>
              )) }
            </select>
          </label>

          <label htmlFor="method">
            Metodo de pagamento:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>

        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (expense) => dispatch(setExpenses(expense)),
  dispatchSetTotal: (total) => dispatch(setTotal(total)),
  fetchCurrencies: () => dispatch(fetchExchangeRateAction()),
}
);

const mapStateToProps = ({ user, wallet }) => ({
  exchangeRates: { ...wallet.currencies },
  email: user.email,
});

Form.propTypes = {
  dispatchSetValue: propTypes.func,
  actualCurrencies: propTypes.object,
}.isRequire;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
