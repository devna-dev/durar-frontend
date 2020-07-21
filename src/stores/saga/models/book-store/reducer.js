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
  CLEAR_BOOK_DATA,
  get_authors_success,
  get_authors,
  search_result,
  GET_Search_Result_SUCCESS,
  GET_BOOK_CONTENT_PENDING,
  GET_BOOK_CONTENT_SUCCESS,
  set_page,
  increase_page,
  decrease_page,
  get_popular_books,
  get_popular_books_success,
  get_popular_books_failed,
  get_current_read,
  get_current_read_success,
  suggest,
  suggest_success,
  SUGGEST_FAILURE,
  get_activities,
  get_activities_success,
  GET_BOOK_REVIEWS_SUCCESS,
  post_review,
  post_review_success,
  post_review_fail,
  GET_BOOK_NOTES_PENDING,
  GET_BOOK_Notes_SUCCESS,
  post_note,
  post_note_success,
  post_note_fail,
  GET_BOOK_NOTES_FAILURE,
  GET_BOOK_DETAIL_FAILURE,
  GET_BOOK_CONTENT_FAILURE,
  SEARCH_IN_BOOK_PENDING,
  SEARCH_IN_BOOK_SUCCESS,
  SEARCH_IN_BOOK_FAIL,
  CLEAR_SEARCH_IN_BOOK,
  SET_CURRENT_READING_BOOK,
  donate,
  donate_success,
  DONATION_FAILURE,
  CLEAR_SEARCH_CACHE,
} from './actions';

const initialState = {
  singleBook: {},
  singleBookLoading: false,
  bookPageContent: {},
  searchedContent: [],
  book_notes: {},
  bookReviews: {},
  book_error: null,
  note_errors: null,
  book_notes_error: null,
  book_content_error: null,
  search_content_error: null,
  donation_error: null,
  suggest_error: null,
  home_books: [],
  homeBooksLoading: false,
  page: 1,
  books: [],
  searched_books: [],
  current_books: [],
  categories: [],
  authors: [],
  activities: [],
  currentReading: undefined,
  bookDetail: {},
  bookDetailLoading: false,
  category_id: '',
  load: false,
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case get_books:
      return { ...state, loading: 'get_books', load: true };
    case get_books_success:
      return {
        ...state,
        loading: 'get_books_success',
        books: action.form,
        load: false,
      };
    case suggest:
      return { ...state, loading: 'suggest', load: true };
    case suggest_success:
      return {
        ...state,
        loading: 'suggest_success',
        message: action.form,
        load: false,
      };
    case SUGGEST_FAILURE:
      return {
        ...state,
        suggest_error: action.form,
        load: false,
      };
    case donate:
      return { ...state, loading: 'donate', load: true };
    case donate_success:
      return {
        ...state,
        loading: 'donate_success',
        message: action.form,
        load: false,
      };
    case DONATION_FAILURE:
      return {
        ...state,
        donation_error: action.form,
        load: false,
      };
    case get_categories:
      return { ...state, loading: 'get_categories', load: true };
    case get_categories_success:
      return {
        ...state,
        loading: 'get_categories_success',
        categories: action.form,
        load: false,
      };
    case get_authors:
      return { ...state, loading: 'get_authors', load: true };
    case search_result:
      return { ...state, loading: 'search_result', load: true };
    case GET_Search_Result_SUCCESS:
      return {
        ...state,
        searched_books: action.form,
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
      return { ...state, loading: 'get_book_detail', singleBookLoading: true };
    case GET_BOOK_SUCCESS:
      return {
        ...state,
        singleBook: { ...state.singleBook, [action.lookupId]: action.form?.book },
        bookReviews: { ...state.bookReviews, [action.lookupId]: action.form?.reviews },
        singleBookLoading: false,
      };
    case CLEAR_BOOK_DATA:
      let tempSingleBook = state.singleBook;
      let tempBookReviews = state.bookReviews;
      !!tempSingleBook?.[action?.lookupId] && delete tempSingleBook[action.lookupId];
      !!tempBookReviews?.[action?.lookupId] && delete tempBookReviews[action.lookupId];
      return {
        ...state,
        singleBook: tempSingleBook,
        bookReviews: tempBookReviews,
      };
    case GET_BOOK_DETAIL_PENDING:
      return { ...state, loading: 'get_book_detail', bookDetailLoading: true };
    case GET_BOOK_NOTES_PENDING:
      return { ...state, loading: 'get_book_notes', load: true };
    case GET_BOOK_DETAIL_SUCCESS:
      return {
        ...state,
        bookDetail: { ...state.bookDetail, [action.lookupId]: action.form },
        bookDetailLoading: false,
      };
    case GET_BOOK_DETAIL_FAILURE:
      return {
        ...state,
        book_detail_error: action.form,
        bookDetailLoading: false,
      };
    case GET_BOOK_Notes_SUCCESS:
      return {
        ...state,
        book_notes: { ...state.book_notes, [action.lookupId]: action.form },
        load: false,
      };
    case GET_BOOK_NOTES_FAILURE:
      return {
        ...state,
        book_notes_error: action.form,
        load: false,
      };
    case GET_BOOK_CONTENT_FAILURE:
      return {
        ...state,
        book_content_error: action.form,
        load: false,
      };
    case GET_BOOK_FAILURE:
      return {
        ...state,
        book_error: action.form,
        singleBookLoading: false,
      };
    case GET_BOOK_REVIEWS_SUCCESS:
      return {
        ...state,
        bookComments: action.form?.reviews,
        load: false,
      };
    case GET_BOOK_CONTENT_PENDING:
      return { ...state, loading: 'get_book_content_detail', load: true };
    case GET_BOOK_CONTENT_SUCCESS:
      return {
        ...state,
        bookPageContent: { ...state.bookPageContent, [action.lookupId]: action.form },
        load: false,
      };
    case set_page:
      console.log(action?.page);
      console.log(state.bookDetail?.[action.lookupId]?.page_count);
      console.log(action?.page < state.bookDetail?.[action.lookupId]?.page_count);
      return {
        ...state,
        page: action?.page,//action?.page > 0 && action?.page < state.bookDetail?.[action.lookupId]?.page_count ? action?.page : state.page
      };
    case increase_page:
      return {
        ...state,
        page:
          state.page + 1 < state.bookDetail?.[action.lookupId]?.page_count
            ? state.page + 1
            : state.bookDetail?.[action.lookupId]?.page_count,
      };
    case decrease_page:
      return {
        ...state,
        page: state.page - 1 > 1 ? state.page - 1 : 1,
      };
    case get_popular_books:
      return { ...state, loading: 'get_popular_books', homeBooksLoading: true };
    case get_popular_books_success:
      return { ...state, home_books: action.form, books: action.form, homeBooksLoading: false };
    case get_popular_books_failed:
      return { ...state, home_books: [], books: [], homeBooksLoading: false };
    case get_activities:
      return { ...state, loading: 'get_activities', load: true };
    case get_activities_success:
      return { ...state, activities: action.form, load: false };
    case get_current_read:
      return { ...state, loading: 'get_current_read', load: true };
    case get_current_read_success:
      return { ...state, current_books: action.form, load: false };
    case post_review:
      return { ...state, loading: 'post_review', load: true };
    case post_review_success:
      return { ...state, load: false };
    case post_review_fail:
      return { ...state, post_review_err: action.form, load: false };
    case post_note:
      return { ...state, loading: 'post_note', load: true };
    case post_note_success:
      return { ...state, load: false };
    case post_note_fail:
      return { ...state, note_errors: action.form, load: false };
    case SEARCH_IN_BOOK_PENDING:
      return { ...state, loading: 'post_note', load: true };
    case SEARCH_IN_BOOK_SUCCESS:
      return { ...state, searchedContent: action.form, load: false };
    case CLEAR_SEARCH_IN_BOOK:
      return { ...state, search_content_error: action.form, load: false };
    case SEARCH_IN_BOOK_FAIL:
      return {
        ...state,
        searchedContent: initialState.searchedContent,
        load: false,
      };
    case SET_CURRENT_READING_BOOK:
      return {
        ...state,
        currentReading: action.lookupId,
      }
    case CLEAR_SEARCH_CACHE:
      let tempBookDetail = state.bookDetail;
      let tempBook_notes = state.book_notes;
      let tempBookPageContent = state.bookPageContent;
      !!tempBookDetail?.[action?.lookupId] && delete tempBookDetail[action.lookupId];
      !!tempBook_notes?.[action?.lookupId] && delete tempBook_notes[action.lookupId];
      !!tempBookPageContent?.[action?.lookupId] && delete tempBookPageContent[action.lookupId];
      return {
        ...state,
        bookDetail: tempBookDetail,
        book_notes: tempBook_notes,
        bookPageContent: tempBookPageContent,
      };
    case clear:
      return { ...initialState, loading: 'clear' };
    default:
      return state;
  }
};

export { reducer };
