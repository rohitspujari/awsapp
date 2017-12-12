import {
  FEDERATED_SIGN_IN,
  AUTH_ERROR,
  SIGN_IN,
  SIGN_OUT
} from '../actions/types';

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case AUTH_ERROR:
      return action.payload;
    case SIGN_IN:
      return action.payload;
    case FEDERATED_SIGN_IN:
      return action.payload;
    case SIGN_OUT:
      return action.payload;
    default:
      return state;
  }
}
