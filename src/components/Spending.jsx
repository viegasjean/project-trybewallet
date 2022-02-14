import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Spending extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <main>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ Number(expense.value).toFixed(2) }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    { Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2) }

                  </td>
                  <td>{ expense.value * expense.exchangeRates[expense.currency].ask }</td>
                  <td>Real</td>
                  <td>Editar/Excluir</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </main>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

Spending.propTypes = {
  expenses: propTypes.object,
}.isRequire;

export default connect(mapStateToProps)(Spending);
