import { LOG_IN, RESET_TOKEN } from '../../constants/actionTypes';

const initialState = {
  token: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.payload.token
      }
    case RESET_TOKEN:
      return {
        ...state,
        token: null
      }
    default:
      return state;
  }
};

export default userReducer;
