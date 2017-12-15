import {
  FEDERATED_SIGN_IN,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  CONFIRM_SIGN_UP,
  AUTH_ERROR,
  TEST,
  TEST2
} from './types';
import { Auth } from 'aws-amplify';

export const signInAfterSignUp = (
  username,
  password,
  history
) => async dispatch => {
  try {
    const user = await Auth.signIn(username, password, history);

    dispatch({
      type: SIGN_IN,
      payload: user
    });
    history.push('/signin');
  } catch (err) {
    let error = err;
    if (err.code) {
      error = err.message;
    }
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error
    });
  }
};

//The user is already signed-in from previous session
export const signedIn = user => dispatch => {
  if (user.name) {
    dispatch({
      type: FEDERATED_SIGN_IN,
      payload: user
    });
  } else {
    dispatch({
      type: SIGN_IN,
      payload: user
    });
  }
};
//In use
export const signOut = () => dispatch => {
  Auth.signOut()
    .then(data => {
      dispatch({
        type: SIGN_OUT,
        payload: null
      });
    })
    .catch(err => null);
};

export const signUp = (username, password, email, phone) => dispatch => {
  Auth.signUp(username, password, email, phone)
    .then(user => {
      //console.log(data);
      dispatch({
        type: SIGN_UP,
        payload: user
      });
    })
    .catch(err => {
      let error = err;
      if (err.code) {
        error = err.message;
      }
      dispatch({
        type: AUTH_ERROR,
        payload: error
      });
    });
};
export const confirmSignUp = (username, code) => dispatch => {
  Auth.confirmSignUp(username, code)
    .then(data => {
      console.log(data);
      dispatch({
        type: CONFIRM_SIGN_UP,
        payload: data
      });
    })
    .catch(err => {
      console.log(err);
      let error = err;
      if (err.code) {
        error = err.message;
      }
      dispatch({
        type: CONFIRM_SIGN_UP,
        payload: error
      });
    });
};

//In Use
export const authError = error => dispatch => {
  dispatch({
    type: AUTH_ERROR,
    payload: error
  });
};

export const testAction = () => async dispatch => {
  dispatch({
    type: TEST,
    payload: 'myaction'
  });
};

export const testAction2 = () => async dispatch => {
  dispatch({
    type: TEST2,
    payload: 'myaction2'
  });
};
