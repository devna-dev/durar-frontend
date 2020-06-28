import {
  clear,
  get_books,
  get_categories,
  get_books_success,
  get_categories_success,
  GET_BOOK_DETAIL_PENDING,
  GET_BOOK_DETAIL_SUCCESS,
  GET_BOOK_PENDING,
  GET_BOOK_SUCCESS,
  GET_BOOK_FAILURE,
  get_authors_success,
  get_authors,
  search_result,
  GET_Search_Result_SUCCESS,
  GET_BOOK_CONTENT_PENDING,
  GET_BOOK_CONTENT_SUCCESS,
  increase_page,
  decrease_page,
  get_popular_books,
  get_popular_books_success,
  get_current_read,
  get_current_read_success,
  suggest,
  suggest_success,
} from './actions';

const initialState = {
  book: null,
  bookPageContent: '',
  bookComments: [],
  book_error: null,
  page: 1,
  books: [],
  current_books: [],
  categories: [],
  authors: [],
  bookDetail: null,
  category_id: '',
  load: false,
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case get_books:
      return {...state, loading: 'get_books', load: true};
    case get_books_success:
      return {
        ...state,
        loading: 'get_books_success',
        books: action.form,
        load: false,
      };
    case suggest:
      return {...state, loading: 'suggest', load: true};
    case suggest_success:
      return {
        ...state,
        loading: 'suggest_success',
        message: action.form,
        load: false,
      };
    case get_categories:
      return {...state, loading: 'get_categories', load: true};
    case get_categories_success:
      return {
        ...state,
        loading: 'get_categories_success',
        categories: action.form,
        load: false,
      };
    case get_authors:
      return {...state, loading: 'get_authors', load: true};
    case search_result:
      return {...state, loading: 'search_result', load: true};
    case GET_Search_Result_SUCCESS:
      return {
        ...state,
        books: action.form,
        load: false,
      };
    case get_authors_success:
      return {
        ...state,
        loading: 'get_authors_success',
        authors: action.form,
        load: false,
      };
    case GET_BOOK_PENDING:
      return {...state, loading: 'get_book_detail', load: true};
    case GET_BOOK_SUCCESS:
      return {
        ...state,
        book: action.form?.book,
        load: false,
      };
    case GET_BOOK_DETAIL_PENDING:
      return {...state, loading: 'get_book_detail', load: true};
    case GET_BOOK_DETAIL_SUCCESS:
      return {
        ...state,
        bookDetail: action.form?.bookDetail,
        bookPageContent: action.form?.bookPageContent,
        bookComments: action.form?.comments,
        load: false,
      };
    case GET_BOOK_FAILURE:
      return {
        ...state,
        book_error: action.form,
        load: false,
      };
    case GET_BOOK_CONTENT_PENDING:
      return {...state, loading: 'get_book_content_detail', load: true};
    case GET_BOOK_CONTENT_SUCCESS:
      return {
        ...state,
        bookPageContent: action.form,
        load: false,
      };
    case increase_page:
      return {
        ...state,
        page:
          state.page + 1 < state.bookDetail.page_count
            ? state.page + 1
            : state.bookDetail.page_count,
      };
    case decrease_page:
      return {
        ...state,
        page: state.page - 1 > 1 ? state.page - 1 : 1,
      };
    case get_popular_books:
      return {...state, loading: 'get_popular_books', load: true};
    case get_popular_books_success:
      return {...state, books: action.form, load: false};
    case get_current_read:
      return {...state, loading: 'get_current_read', load: true};
    case get_current_read_success:
      return {...state, current_books: action.form, load: false};
    case clear:
      return {...initialState, loading: 'clear'};
    default:
      return state;
  }
};

export {reducer};
