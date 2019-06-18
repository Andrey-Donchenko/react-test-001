import { GET_TASK_LIST, CHANGE_TASK_LIST } from '../../constants/actionTypes';

const initialState = {
  data: [],
  count: '',
  toggleStatus: false
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_LIST:
      return {
        ...state,
        data: action.payload.tasks,
        count: action.payload.total_task_count
      }
    case CHANGE_TASK_LIST:
      return {
        ...state,
        toggleStatus: !state.toggleStatus
      }
    default:
      return state;
  }
};

export default todoReducer;
