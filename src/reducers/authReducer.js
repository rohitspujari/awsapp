import {
  FEDERATED_SIGN_IN,
  AUTH_ERROR,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CONFIRM_SIGN_UP
} from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case AUTH_ERROR: // In Use
      return { error: action.payload };

    case SIGN_IN: //In Use
      return action.payload;

    case FEDERATED_SIGN_IN: //In Use
      return action.payload;

    case SIGN_OUT: //In Use
      return action.payload;

    case SIGN_UP: //In use
      return action.payload;

    case CONFIRM_SIGN_UP: //In Use
      return {
        ...state,
        userConfirmMessage: action.payload
      };

    default:
      return state;
  }
}
