// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  const { expenses } = state;
  switch (action.type) {
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...expenses, action.payload],
    };
  case 'SET_TOTAL':
    return {
      ...state,
      total: action.payload,
    };
  case 'GET_EXCHANGE_RATE':
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
}
