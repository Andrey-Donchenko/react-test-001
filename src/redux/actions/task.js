import { apiHandle } from '../../utils/apiHandle';
import * as types from '../../constants/actionTypes';

export const getTaskList = params => dispatch => {
  apiHandle('get', '/', {}, { params })
    .then(response => {
      if (response.data.status === 'ok') {
        return dispatch({
          type: types.GET_TASK_LIST,
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

export const createTask = data => dispatch => {
  apiHandle('post', `/create`, data)
    .then(response => {
      if (response.data.status === 'ok') {
        return dispatch({
          type: types.CHANGE_TASK_LIST
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

export const updateTask = (taskId, data) => dispatch => {
  apiHandle('post', `/edit/${taskId}`, data)
    .then(response => {
      if (response.data.status === 'ok') {
        return dispatch({
          type: types.CHANGE_TASK_LIST
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
