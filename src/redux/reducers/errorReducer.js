import { RECORD_ERROR } from '../../constants/actionTypes';

const initialState = {
  data: []
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECORD_ERROR:
      const res = [];
      if (typeof action.payload === 'string') {
        res.push(action.payload);
      } else {
        for (let i in action.payload) {
          res.push(`${i}: ${action.payload[i]}`);
        }
      }
      return {
        ...state,
        data: res
      }
    default:
      return state;
  }
};

export default errorReducer;
