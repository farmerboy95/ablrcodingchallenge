import { userConstants } from '../constants';

const initialState = {
  user: null,
  token: null,
};

export function userPage(state = initialState, action) {
  switch (action.type) {
    case userConstants.EXCHANGE_TOKEN_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case userConstants.EXCHANGE_TOKEN_SUCCESS:
      return {
        user: state.user,
        token: action.data,
      }
    case userConstants.EXCHANGE_TOKEN_FAILURE:
      return {
        loading: false,
        ...state,
      }
    case userConstants.GET_USER_INFO_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case userConstants.GET_USER_INFO_SUCCESS:
      return {
        user: action.data,
        token: state.token,
      }
    case userConstants.GET_USER_INFO_FAILURE:
      return {
        loading: false,
        ...state,
      }
    case userConstants.LOGOUT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case userConstants.LOGOUT_SUCCESS:
      return {
        user: null,
        token: null,
      }
    case userConstants.GO_TO_LOGIN_URL_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case userConstants.GO_TO_LOGIN_URL_FAILURE:
      return {
        loading: false,
        ...state,
      }
    default:
      return state;
  }
}