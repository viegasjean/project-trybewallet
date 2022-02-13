// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const SET_EXPENSES = 'SET_EXPENSES';

export const userAction = (payload) => (
  {
    type: LOGIN,
    payload,
  }
);

export const setExpenses = (payload) => (
  {
    type: SET_EXPENSES, payload,
  }
);

export const setTotal = (payload) => (
  {
    type: 'SET_TOTAL', payload,
  }
);

function getExchangeRate(data) {
  return { type: 'GET_EXCHANGE_RATE', payload: data };
}

function failedRequest(error) {
  return { type: 'FAILED_REQUEST', payload: error };
}

function requestExchangeRate() {
  return { type: 'REQUEST_EXCHANGE_RATE' };
}

function fetchExchangeRateAction() {
  return async (dispatch) => {
    dispatch(requestExchangeRate());

    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      return dispatch(getExchangeRate(data));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

export default fetchExchangeRateAction;
