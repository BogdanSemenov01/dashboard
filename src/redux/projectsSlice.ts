import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
  projects: Array<Project>
  currentProjectId: number
}

export type Project = {
  title: string
  id: number
  tasks: Tasks

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
  description: string
  priority: 'low' | 'middle' | 'high'
  subTasks: Array<Subtask>
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
    createProject: (state, action: PayloadAction<{text: string}>) => {
      state.projects.push({
        title: action.payload.text,
        id: Date.now(),
        tasks: {
          queueTasks: [],
          developmentTasks: [],
          doneTasks: [],
        }
      })
    },
    deleteProject: (state, action: PayloadAction<{id: number}>) => {
      const index = state.projects.findIndex((p: Project) => p.id === +action.payload.id)
      if (index > -1) {
        state.projects.splice(index, 1)
      }
    },
    setCurrentProjectId: (state, action: PayloadAction<{projectId: string | undefined}>) => {
      state.currentProjectId = Number(action.payload.projectId)
    },
    changeTaskStatus: (state, action: PayloadAction<{
      currentStatus: string
      id: number
      nextStatus?: string
    }>) => {
      state.projects.map((p: Project) => {
        if (p.id === state.currentProjectId) {
          const element = removeTaskFromCurrentStatus(p.tasks, action.payload.currentStatus, action.payload.id)
          pushTaskToNextStatus(p.tasks, element, action.payload.nextStatus)
        }
      })
    },
    createNewTask: (state, action: PayloadAction<{
      status: string
      text: string

    }>) => {
      let statusTask = selectSection(action.payload.status)
      let element: Task = {
        id: Date.now(),
        text: action.payload.text || 'Update me',
        description: '',
        priority: 'low',
        subTasks: []
      }
      state.projects.map((p: Project) => {
        if (p.id === state.currentProjectId) {
          p.tasks[statusTask].push(element)
        }
      })
    },
    deleteTask: (state, action: PayloadAction<{
      section: string
      taskId: number
    }>) => {
      state.projects.map((p: Project) => {
        if (p.id === state.currentProjectId) {
          let section = selectSection(action.payload.section)
          let index = p.tasks[section].findIndex((t: Task) => t.id === action.payload.taskId)
          if (index > -1) {
            p.tasks[section].splice(index, 1)
          }
        }
      })
    },
    changeTask: (state, action: PayloadAction<{
      section: string
      taskId: number
      newText: string
      newDescription: string
      newPriority: "low" | "middle" | "high"
      newSubTasks: Array<Subtask>
    }>) => {
      state.projects.map((p: Project) => {
        if (p.id === state.currentProjectId) {
          let section = selectSection(action.payload.section)
          p.tasks[section].map((t: Task) => {
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


const pushTaskToNextStatus = (state: Tasks, element: Task, nextStatus: string | undefined): void => {
  let section = selectSection(nextStatus)
  state[section].push(element)
}

const removeTaskFromCurrentStatus = (state: Tasks, currentStatus: string, id: number): Task => {
  let section = selectSection(currentStatus)
  const index = state[section].findIndex((el: Task) => el.id === id)
  const result = state[section].splice(index, 1)[0]
  return result
}



const selectSection = (status: string | undefined): 'queueTasks' | 'developmentTasks' | 'doneTasks' => {
  switch (status) {
    case 'Queue':
      return 'queueTasks'
    case 'Development':
      return 'developmentTasks'
    case 'Done':
      return 'doneTasks'
    default:
      return 'queueTasks'
  }
}