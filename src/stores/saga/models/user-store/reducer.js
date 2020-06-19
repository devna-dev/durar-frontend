import { GET_ALL_USER_INFO_REQUEST_SUCCESS,login } from './actions';

const initialState = {
    id: 'id1',
    name: 'Michael',
    email: 'michael@example.com',
    password:''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USER_INFO_REQUEST_SUCCESS: {
            const { id, name, email } = action.payload;
            return {
                id,
                name,
                email,
            };
        }
        case login:(state) => ({...state, loading: 'login'})
        default:
            return state;
    }
};

export { reducer };