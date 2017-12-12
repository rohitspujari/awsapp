import { FEDERATED_SIGN_IN, SIGN_OUT, SIGN_IN, AUTH_ERROR } from './types';
import { Auth } from 'aws-amplify';

export const signIn = (username, password) => async dispatch => {
  try {
    const user = await Auth.signIn(username, password);
    dispatch({
      type: SIGN_IN,
      payload: {
        authenticated: true,
        currentUser: user.username,
        loginError: null
      }
    });
  } catch (err) {
    let error = err;
    if (err.code) {
      error = err.message;
    }
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: {
        authenticated: false,
        currentUser: null,
        loginError: error
      }
    });
    // dispatch({
    //   type: AUTH_ERROR,
    //   payload: {
    //     authenticated: false,
    //     currentUser: null,
    //     loginError: error
    //   }
    // });
  }
};

export const federatedSignIn = user => async dispatch => {
  dispatch({
    type: FEDERATED_SIGN_IN,
    payload: {
      authenticated: true,
      currentUser: user,
      loginError: null
    }
  });
};
export const signOut = () => async dispatch => {
  Auth.signOut()
    .then(data => {
      dispatch({
        type: SIGN_OUT,
        payload: {
          authenticated: false,
          currentUser: null,
          loginError: null
        }
      });
    })
    .catch(err => null);
};
