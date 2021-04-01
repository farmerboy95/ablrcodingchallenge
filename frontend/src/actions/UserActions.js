import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './AlertActions';
import { history } from '../helpers';

export const userActions = {
  logout,
  getUserInfo,
  exchangeToken,
  goToLoginUrl,
};

function goToLoginUrl() {
  return dispatch => {
    dispatch(request());

    userService.goToLoginUrl()
      .then(
        url => {
          window.location = url;
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );

    function request() { return { type: userConstants.GO_TO_LOGIN_URL_REQUEST } }
    function failure(error) { return { type: userConstants.GO_TO_LOGIN_URL_FAILURE, error } }
  }
}

function exchangeToken(code) {
  return dispatch => {
    dispatch(request());

    userService.exchangeToken(code)
      .then(
        token => {
          dispatch(success(token));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
          history.push('/');
        }
      );

    function request() { return { type: userConstants.EXCHANGE_TOKEN_REQUEST } }
    function success(data) { return { type: userConstants.EXCHANGE_TOKEN_SUCCESS, data } }
    function failure(error) { return { type: userConstants.EXCHANGE_TOKEN_FAILURE, error } }
  }
}

function logout() {
  return dispatch => {
    dispatch(request());

    dispatch(success());
    dispatch(alertActions.success("Logged out successfully!"));
    history.push('/');
  };

  function request() { return { type: userConstants.LOGOUT_REQUEST } }
  function success() { return { type: userConstants.LOGOUT_SUCCESS } }
}

function getUserInfo(token) {
  return dispatch => {
    dispatch(request());

    userService.getUserInfo(token)
      .then(
        user => {
          dispatch(success(user));
          dispatch(alertActions.success("Logged in successfully"));
          history.push('/');
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
          history.push('/');
        }
      )
  }

  function request() { return { type: userConstants.GET_USER_INFO_REQUEST } }
  function success(data) { return { type: userConstants.GET_USER_INFO_SUCCESS, data } }
  function failure(error) { return { type: userConstants.GET_USER_INFO_FAILURE, error } }
}