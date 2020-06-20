import { success,login ,error} from './actions';

const initialState = {
    id: '',
    name: '',
    email: '',
    password:'',
    password_error:'',
    email_error:'',
    token:''
};

const reducer = (state = initialState, action) => {
    console.log('reducer action',action)
    switch (action.type) {
        case login: return {...action['form'], loading: 'login'}
        case success: return {...action['form'], loading: 'login'}
        case error: return {password_error: action['form'].password[0],
            email_error: action['form'].email, loading: 'login', ...state}
        default:
            return state;
    }
};

export { reducer };