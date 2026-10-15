import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: (name, description) => ({
        payload: {
          id: nanoid(),
          name,
          description,
          isDone: false,
        },
      }),
    },

    editTask: (state, action) => {
      const { id, name, description } = action.payload;

      const task = state.tasks.find((task) => task.id === id);

      if (task) {
        task.name = name;
        task.description = description;
      }
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);

      if (task) {
        task.isDone = !task.isDone;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, editTask, toggleTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
