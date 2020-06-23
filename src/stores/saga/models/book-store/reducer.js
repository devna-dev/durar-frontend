import {
  clear,
  get_books,
  get_categories,
  get_books_success,
  get_categories_success,
  GET_BOOK_DETAIL_PENDING,
  GET_BOOK_DETAIL_SUCCESS,
  GET_BOOK_DETAIL_FAILURE,
} from './actions';

const initialState = {
  books: [],
  categories: [],
  bookDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case get_books:
      return {loading: 'get_books', load: true};
    case get_books_success:
      return {
        ...initialState,
        loading: 'get_books_success',
        books: action.form,
        load: false,
      };
    case get_categories:
      return {loading: 'get_categories', load: true};
    case get_categories_success:
      return {
        ...initialState,
        loading: 'get_categories_success',
        categories: action.form,
        load: false,
      };
    case GET_BOOK_DETAIL_PENDING:
      return {loading: 'get_book_detail', load: true};
    case GET_BOOK_DETAIL_SUCCESS:
      return {
        ...state,
        bookDetail: action.form,
        load: false,
      };
    case GET_BOOK_DETAIL_FAILURE:
      return {
        ...state,
        bookDetail: action.form,
        load: false,
      };
    case clear:
      return {...initialState, loading: 'clear'};
    default:
      return state;
  }
};

export {reducer};