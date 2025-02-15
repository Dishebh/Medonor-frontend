import * as actionTypes from '../ActionTypes';

const initialState = {
  Username: null || localStorage.getItem('Username'),
  email: null || localStorage.getItem('email'),
  role: null || localStorage.getItem('role'),
  token: null || localStorage.getItem('token'),
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        Username: null,
        email: null,
        role: null,
        token: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        Username: action.payload.username,
        // email: action.payload.email,
        role: action.payload.role,
        token: action.token,
      };
    default:
      return state;
  }
};

export default UserReducer;
