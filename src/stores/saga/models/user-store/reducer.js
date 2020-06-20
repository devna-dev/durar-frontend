import { GET_ALL_USER_INFO_REQUEST_SUCCESS,login } from './actions';

const initialState = {
    id: '',
    name: '',
    email: '',
    password:''
};

const reducer = (state = initialState, action) => {
    console.log('reducer action',action)
    //const {email, password} = action.form;
    switch (action.type) {
        case login: return {...action['form'], loading: 'login'}
        default:
            return state;
    }
};

export { reducer };