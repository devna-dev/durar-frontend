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
    // console.log('reducer action',action)
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
    console.log(action.type, 'action.type')
    console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////')

    switch (action.type) {
        case clear: return {...initialState, loading: 'clear'};
        case login: return {loading: 'login', ...initialState };
        case success: return {...action['form'], loading: 'success'};
        case error:
            console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
            console.log('error start')
            console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
            console.log(action.form, 'action.form')
            console.log({
                non_field_errors: action['form'].non_field_errors[0],
                loading: 'error'
            })
            console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////////')

            return {
                non_field_errors: action.form.non_field_errors[0],
                loading: 'error'
            }
        default:
            return state;
    }
};

export { reducer };
