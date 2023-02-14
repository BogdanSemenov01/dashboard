import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ReactReduxContext } from 'react-redux'

type State = {
  projects: Array<Project>
  currentProjectId: number
}

export type Project = {
  title: string
  id: number
  tasks: Tasks | undefined

}


type Tasks = {
  queueTasks: StatusTasks
  developmentTasks: StatusTasks
  doneTasks: StatusTasks
}

type StatusTasks = Array<Task>


type Task = {
  id: number
  text: string
  description: string | undefined
  priority: 'low' | 'middle' | 'high'
  subTasks: Subtask[]
}

type Subtask = {
  id: number
  text: string
  isComplete: boolean
}

const initialState: State = {
  projects: [
    {
      title: 'DashBoard',
      id: 1,
      tasks: {
        queueTasks: [
          {
            id: 1,
            text: 'queue',
            description: '',
            priority: 'low',
            subTasks: [
              { id: 1, text: '1', isComplete: true },
              { id: 2, text: '2', isComplete: true },
              { id: 3, text: '3', isComplete: false },
              { id: 4, text: '4', isComplete: false },
            ]
          },
        ],
        developmentTasks: [
          {
            id: 2, 
            text: 'dev', 
            description: '', 
            priority: 'low', 
            subTasks: [
              { id: 1, text: 'dfdfdf', isComplete: false }
            ]
          },
        ],
        doneTasks: [
          { 
            id: 3, 
            text: 'done', 
            description: '', 
            priority: 'low',
            subTasks: [
              { id: 1, text: 'dfdfdf', isComplete: false }
            ]
           },
        ],
      }
    },
    {
      title: 'Portfolio',
      id: 2,
      tasks: {
        queueTasks: [
          { 
            id: 3, 
            text: 'done', 
            description: '', 
            priority: 'low',
            subTasks: [
              { id: 1, text: 'dfdfdf', isComplete: false }
            ]
           },
        ],
        developmentTasks: [
          { 
            id: 3, 
            text: 'done', 
            description: '', 
            priority: 'low',
            subTasks: [
              { id: 1, text: 'dfdfdf', isComplete: false }
            ]
           },
        ],
        doneTasks: [
          { 
            id: 3, 
            text: 'done', 
            description: '', 
            priority: 'low',
            subTasks: [
              { id: 1, text: 'dfdfdf', isComplete: false }
            ]
           },
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
    createProject: (state, action) => {
      state.projects.push({
        title: action.payload.text,
        id: Date.now(),
        tasks: undefined
      })
    },
    deleteProject: (state, action) => {
      const index = state.projects.findIndex((p: any) => p.id === +action.payload.id)
      if (index > -1) {
        state.projects.splice(index, 1)
      }
    },
    setCurrentProjectId: (state, action) => {
      state.currentProjectId = Number(action.payload.projectId)
    },
    changeTaskStatus: (state, action) => {
      state.projects.map((p: any) => {
        if (p.id === state.currentProjectId) {
          const element = removeTaskFromCurrentStatus(p.tasks, action.payload.currentStatus, action.payload.id)
          pushTaskToNextStatus(p.tasks, element, action.payload.nextStatus)
        }
      })
    },
    createNewTask: (state, action) => {
      let statusTask = selectSection(action.payload.status)
      let element: Task = {
        id: Date.now(),
        text: action.payload.text || 'Update me',
        description: '',
        priority: 'low',
        subTasks: []
      }
      state.projects.map((p: any) => {
        if (p.id === state.currentProjectId) {
          p.tasks[statusTask].push(element)
        }
      })
    },
    deleteTask: (state, action) => {
      state.projects.map((p: any) => {
        if (p.id === state.currentProjectId) {
          let section = selectSection(action.payload.section)
          let index = p.tasks[section].findIndex((t: any) => t.id === action.payload.taskId)
          if (index > -1) {
            p.tasks[section].splice(index, 1)
          }
        }
      })
    },
    changeTask: (state, action) => {
      state.projects.map((p: any) => {
        if (p.id === state.currentProjectId) {
          let section = selectSection(action.payload.section)
          p.tasks[section].map((t: any) => {
            if (t.id == action.payload.taskId) {
              t.text = action.payload.newText
              t.description = action.payload.newDescription
              t.priority = action.payload.newPriority
              t.subTasks = [...action.payload.newSubTasks]
            }
          })
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
  createNewTask,
  deleteTask,
  changeTask,
} = projectsSlice.actions

export default projectsSlice.reducer


const pushTaskToNextStatus = (state: any, element: any, nextStatus: any) => {
  let section = selectSection(nextStatus)
  state[section].push(element)
}

const removeTaskFromCurrentStatus = (state: any, currentStatus: any, id: any) => {
  let section = selectSection(currentStatus)
  const index = state[section].findIndex((el: any) => el.id === id)
  const result = state[section].splice(index, 1)[0]
  return result
}



const selectSection = (status: string): string => {
  let section = ''
  switch (status) {
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
      break
  }
  return section
}
