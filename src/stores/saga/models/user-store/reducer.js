import {
  success_login,
  login,
  error,
  clear,
  forget,
  REGISTER_USER_REQUEST_PENDING,
  REGISTER_USER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST_FAILURE,
  logout,
  GET_user_books,
  GET_user_books_SUCCESS
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

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case forget:
      return {
        ...initialState,
        loading: 'forget',
        load: true,
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
        details: action.form.detail,
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
    case GET_user_books:
      return {loading: 'user_books', load: true};
    case GET_user_books_SUCCESS:
      return {
        ...state,
        books: action.form,
        load: false,
      };
    default:
      return state;
  }
};

export {reducer};
