import {
    clear,
    get_thesis,
    get_thesis_success,
    get_activity_details,
    get_activity_details_success,
    get_discussions,
    get_discussions_success,
    get_seminars,
    get_seminars_success
} from './actions';

const initialState = {
    book: null,
    bookPageContent: '',
    bookComments: [],
    bookReviews: [],
    book_error: null,
    page: 1,
    books: [],
    current_books: [],
    categories: [],
    authors: [],
    activities: [],
    activity_details: '',
    thesis: [],
    bookDetail: null,
    category_id: '',
    load: false,
    message: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case get_thesis:
            return {...state, loading: 'get_thesis', load: true};
        case get_thesis_success:
            return {
                ...state,
                loading: 'get_thesis_success',
                thesis: action.form,
                load: false,
            };
        case get_activity_details:
            return {...state, loading: 'get_activity_details', load: true};
        case get_activity_details_success:
            return {
                ...state,
                loading: 'get_activity_details_success',
                activity_details: action.form,
                load: false,
            };
        case get_discussions:
            return {...state, loading: 'get_discussions', load: true};
        case get_discussions_success:
            return {
                ...state,
                loading: 'get_discussions_success',
                activities: action.form,
                load: false,
            };
        case get_seminars:
            return {...state, loading: 'get_seminars', load: true};
        case get_seminars_success:
            return {
                ...state,
                loading: 'get_seminars_success',
                activities: action.form,
                load: false,
            };
        case clear:
            return {...initialState, loading: 'clear'};
        default:
            return state;
    }
};

export {reducer};
