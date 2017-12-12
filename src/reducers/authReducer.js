import {
  AUTH_USER,
  AUTH_ERROR,
  CURRENT_USER,
  SIGN_OUT
} from '../actions/types';

export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    case AUTH_ERROR:
      return action.payload;
    case CURRENT_USER:
      return action.payload;
    case SIGN_OUT:
      return action.payload;
    default:
      return state;
  }
}
