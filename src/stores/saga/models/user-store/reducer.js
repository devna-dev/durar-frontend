import {
  success_login,
  login,
  error,
  clear,
  reset,
  REGISTER_USER_REQUEST_PENDING,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILURE,
  logout,
  success_reset,
  verify_email_pending,
  verify_email_success,
} from './actions';

const initialState = {
  id: '',
  name: '',
  email: '',
  password: '',
  login_errors: null,
  token: '',
  allow_navigate: false,
  load: false,
  detail: '',
  details: '',
  isUserRegistered: false,
  register_errors: null,
  books: [],
  isEmailVerified: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case reset:
      return {
        ...state,
        loading: 'forget',
        load: true,
      };
    case success_reset:
      return {
        ...state,
        loading: 'success_forget',
        load: false,
        detail: action.form.detail,
      };
    case verify_email_pending:
      return {
        ...state,
        loading: 'verify_email',
        load: true,
      };
    case verify_email_success:
      return {
        ...state,
        loading: 'verify_email_success',
        load: false,
        isEmailVerified: action.form.detail,
      };
    case clear:
      return {...initialState, loading: 'clear'};
    case logout:
      return {...initialState, loading: 'logout'};
    case login:
      return {loading: 'login', ...initialState, load: true};
    case success_login:
      return {
        ...action.form,
        allow_navigate: true,
        detail: '',
        load: false,
        loading: 'success',
      };
    case error:
      return {
        load: false,
        allow_navigate: false,
        login_errors: action.form,
        detail: action.form.detail,
        loading: 'error',
      };
    case REGISTER_USER_REQUEST_PENDING:
      return {...state, load: true};
    case REGISTER_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isUserRegistered: true,
        load: false,
        allow_navigate: true,
      };
    case REGISTER_USER_REQUEST_FAILURE:
      return {
        ...state,
        isUserRegistered: false,
        register_errors: action.form,
        load: false,
        allow_navigate: false,
      };
    default:
      return state;
  }
};

export {reducer};
