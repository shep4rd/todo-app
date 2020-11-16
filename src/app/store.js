import { configureStore } from '@reduxjs/toolkit';
import taskListReducer from '../taskList/taskListSlice';

export default configureStore({
  reducer: {
    taskList: taskListReducer
  },
});
