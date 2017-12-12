import { AUTH_USER, AUTH_ERROR, CURRENT_USER, SIGN_OUT } from './types';
import { Auth } from 'aws-amplify';

export const loginUser = (username, password) => async dispatch => {
  try {
    const user = await Auth.signIn(username, password);
    dispatch({ type: AUTH_USER, payload: user });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  }
};

export const currentUser = user => async dispatch => {
  dispatch({ type: CURRENT_USER, payload: user });
};

export const signOut = () => async dispatch => {
  Auth.signOut()
    .then(data => {
      dispatch({ type: SIGN_OUT, payload: null });
    })
    .catch(err => null);
};
