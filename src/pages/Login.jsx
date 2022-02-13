import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userAction } from '../actions';

const PASS_LEN = 6;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
  }

  validateInputs = () => {
    const { email, password } = this.state;
    const validEmail = EMAIL_REGEX.test(email);
    const validPassword = password.length >= PASS_LEN;
    this.setState({
      isDisabled: !validPassword || !validEmail,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.validateInputs());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { submitEmail, history } = this.props;
    submitEmail(email);
    history.push('/carteira');
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <section>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="email">
            Email:
            <input
              name="email"
              type="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              name="password"
              type="password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button type="submit" disabled={ isDisabled }>Entrar</button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (email) => dispatch(userAction(email)),
});

Login.propTypes = {
  submitEmail: propTypes.func,
}.isRequire;

export default connect(null, mapDispatchToProps)(Login);
