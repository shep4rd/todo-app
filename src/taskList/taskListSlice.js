import { createSlice } from "@reduxjs/toolkit";

export const taskListSlice = createSlice({
  name: "[TASK LIST]",

  initialState: {
    tasks: [
      {
        id: 0,
        title: 'Zadanie z opisem',
        description: 'Opis zadania do podania',
        isOpen: true,
        bgColor: '#bbbbbb',
        txtColor: '#000000',
      },
      {
        id: 1,
        title: 'Zadanie bez opisu',
        description: '',
        isOpen: true,
        bgColor: '#bbbbbb',
        txtColor: '#000000',
      },
    ],
  },

  reducers: {
    addTask: (state, action) => {
      state.tasks.push(
        {
          id: state.tasks.length,
          title: action.payload,
          description: '',
          isOpen: true,
          bgColor: '#bbbbbb',
          txtColor: '#000000',
        }
      )
    },
    closeTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload)
      state.tasks[index].isOpen = false;
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      state.tasks[index].title = action.payload.title;
      state.tasks[index].description = action.payload.description;
      state.tasks[index].bgColor = action.payload.bgColor;
      state.tasks[index].txtColor = action.payload.txtColor;
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload
    }
  },
});

export const {
  addTask,
  editTask,
  closeTask,
  reorderTasks,
} = taskListSlice.actions;

export const selectTasks = (state) => state.taskList.tasks.filter((task) => task.isOpen);

export default taskListSlice.reducer;
