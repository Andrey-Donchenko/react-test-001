import { apiHandle } from '../../utils/apiHandle';
import * as types from '../../constants/actionTypes';

export const logIn = data => dispatch => {
  apiHandle('post', '/login', data)
    .then(response => {
      if (response.data.status === 'ok') {
        return dispatch({
          type: types.LOG_IN,
          payload: response.data.message
        });
      } else {
        return dispatch({
          type: types.RECORD_ERROR,
          payload: response.data.message
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export const resetToken = () => {
  return {
    type: types.RESET_TOKEN,
  }
}
