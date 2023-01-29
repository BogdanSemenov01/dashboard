import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

const initialState:any = {
  tasks: {

  }
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasks: (state, action) => {
      state.tasks.push(action.payload.tasks)
    },
    changeTaskStatus: (state, action) => {
      if (state.tasks) {

        state.tasks.map((t:any) => {
          if (t.id === action.payload.id) {
            t.status = action.payload.status
          }
        })
      }
    }
  },
})


