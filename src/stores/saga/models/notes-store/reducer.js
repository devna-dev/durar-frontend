import {
  CLEAR_NOTES,
  PENDING_REQUEST_NOTES,
  SUCCESS_REQUEST_NOTES,
  PENDING_DELETE_NOTES,
  SUCCESS_DELETE_NOTES,
  NOTES_FAIL,

  CLEAR_BOOKS_NOTES,
  PENDING_REQUEST_BOOKS_NOTES,
  SUCCESS_REQUEST_BOOKS_NOTES,
  PENDING_DELETE_BOOKS_NOTES,
  SUCCESS_DELETE_BOOKS_NOTES,
  BOOKS_NOTES_FAIL,
} from './actions';

const initialState = {
  load: false,
  notes: [],
  booksNotes: [],
  notes_message: '',
  notes_errors: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_NOTES:
      return { ...initialState, loading: 'clear' };
    case PENDING_REQUEST_NOTES:
      return { ...state, load: true };
    case SUCCESS_REQUEST_NOTES:
      return { ...state, notes: action.form || [], load: false };
    case PENDING_DELETE_NOTES:
      return { ...state, load: true };
    case SUCCESS_DELETE_NOTES:
      return { ...state, notes_message: action.form, load: false };
    case NOTES_FAIL:
      return {
        ...state,
        load: false,
        notes_errors: action.form,
        loading: 'error',
      };




    case CLEAR_BOOKS_NOTES:
      return { ...initialState, loading: 'clear' };
    case PENDING_REQUEST_BOOKS_NOTES:
      return { ...state, load: true };
    case SUCCESS_REQUEST_BOOKS_NOTES:
      return { ...state, booksNotes: action.form || [], load: false };
    case PENDING_DELETE_BOOKS_NOTES:
      return { ...state, load: true };
    case SUCCESS_DELETE_BOOKS_NOTES:
      return { ...state, notes_message: action.form, load: false };
    case BOOKS_NOTES_FAIL:
      return {
        ...state,
        load: false,
        notes_errors: action.form,
        loading: 'error',
      };

    default:
      return state;
  }
};

export { reducer };
