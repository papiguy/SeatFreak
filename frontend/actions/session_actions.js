import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT = "LOGOUT";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  }
};

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT
  }
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_ERRORS,
    errors: errors
  }
};

export const loginUser = user => dispatch => {
  return SessionApiUtil.loginUser(user).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors))
  );
};

export const signupUser = user => dispatch => {
  return SessionApiUtil.signup(user).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors))
  );
};

export const logoutUser = user => dispatch => {
  return SessionApiUtil.logout().then(
    () => dispatch(logoutCurrentUser())
  );
};
