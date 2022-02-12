// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const SET_PROFESSIONAL_VALUE = 'SET_PROFESSIONAL_VALUE';

export default function userAction(payload) {
  return {
    type: LOGIN,
    payload,
  };
}
