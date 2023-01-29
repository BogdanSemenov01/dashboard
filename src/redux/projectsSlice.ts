import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

const initialState:any = {
  projects: [
    {
      title: 'Project 1',
      id: 1,
      tasks: {
        queueTasks : [
          {id: 1, text: 'blabla'},
          {id: 2, text: 'blabla'},
          {id: 3, text: 'blabla'},
        ],
        developmentTasks: [
          {id: 4, text: 'blabla'},
          {id: 5, text: 'blabla'},
          {id: 6, text: 'blabla'},
        ],
        doneTasks: [
          {id: 7, text: 'blabla'},
          {id: 8, text: 'blabla'},
          {id: 9, text: 'blabla'},
        ],
      }
    },
    {
      title: 'Project 2',
      id: 2,
      tasks: {
        queueTasks : [
          {id: 1, text: 't 1 q'},
          {id: 2, text: 't 2 q'},
          {id: 3, text: 't 3 q'},
        ],
        developmentTasks: [
          {id: 4, text: 't 4 dev'},
          {id: 5, text: 't 5 dev'},
          {id: 6, text: 't 6 dev'},
        ],
        doneTasks: [
          {id: 7, text: 't 7 done'},
          {id: 8, text: 't 8 done'},
          {id: 9, text: 't 9 done'},
        ],
      }
      }
    ],
  currentProjectId: 0,
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    createProject: (state) => {
      state.projects.push({title:'Project ' + `${Date.now()}`, id: Date.now()})
    },
    deleteProject: (state, action) => {
      const index = state.projects.findIndex((p:any) => p.id === +action.payload.id)
      if (index > -1) {
        state.projects.splice(index, 1)
      }
    },
    setCurrentProjectId: (state, action) => {
      state.currentProjectId = +action.payload.projectId
    },
    changeTaskStatus: (state, action) => {
      state.projects.map((p:any) => {
        if (p.id === state.currentProjectId) {
          const element = removeTaskFromCurrentStatus(p.tasks, action.payload.currentStatus, action.payload.id)
          pushTaskToNextStatus(p.tasks, element, action.payload.nextStatus)
        }
      })
    }
  },
})

export const {
  createProject, 
  deleteProject,
  setCurrentProjectId, 
  changeTaskStatus,
} = projectsSlice.actions

export default projectsSlice.reducer


const pushTaskToNextStatus = (state: any, element: any, nextStatus: any) => {
  let section = ''
  switch (nextStatus) {
    case 'Queue':
      section = 'queueTasks'
      break;
    case 'Development':
      section = 'developmentTasks'
      break;
    case 'Done':
      section = 'doneTasks'
      break;
    default:
      break;
  }

  state[section].push(element)
}

const removeTaskFromCurrentStatus = (state: any, currentStatus: any, id: any) => {
  let section = ''
  switch (currentStatus) {
    case 'Queue':
      section = 'queueTasks'
      break
    case 'Development':
      section = 'developmentTasks'
      break
    case 'Done':
      section = 'doneTasks'
      break
    default:
      break;
  }
  const index = state[section].findIndex((el: any) => el.id === id)
  const result = state[section].splice(index, 1)[0]
  return result
}
