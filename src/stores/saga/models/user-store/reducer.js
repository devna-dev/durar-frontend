import { success,login ,error,clear} from './actions';

const initialState = {
    id: '',
    name: '',
    email: '',
    password:'',
    password_error:'',
    email_error:'',
    non_field_errors:'',
    token:''
};

const reducer = (state = initialState, action) => {
    console.log('reducer action',action)
    switch (action.type) {
        case clear: return {...initialState, loading: 'clear'};
        case login: return {loading: 'login'};
        case success: return {...action['form'], loading: 'success',...initialState};
        case error: return {password_error: action['form'].password[0],
            email_error: action['form'].email, non_field_errors:action['form'].non_field_errors[0],loading: 'error', ...initialState}
        default:
            return state;
    }
};

export { reducer };
