import projectReducer, { Project, State, changeTaskStatus, createProject, deleteProject, setCurrentProjectId } from "./projectsSlice"

let initialState: State
beforeEach(()=> {
  initialState = {
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
    ],
    currentProjectId: 0,
  }
})

describe('createProject', () => { 
  test('should return initial state', () => { 
    expect(projectReducer(initialState, {type: undefined})).toEqual(initialState)
  })
  
  test('should new project have correct title', () => { 
    const previousState: State = {
      projects: [],
      currentProjectId: 1
    }
    
    expect(projectReducer(previousState, createProject({text: 'Test project'}))).toHaveProperty('projects[0].title', 'Test project')
  })
  
  test('should add new project', () => { 
    const previousState: State = {
      projects: [],
      currentProjectId: 1
    }
    
    expect(projectReducer(previousState, createProject({text: 'Test project'})).projects).toHaveLength(1)
  })
})

describe('deleteProject', () => { 
  test('should delete project', () => { 
  
    expect(projectReducer(initialState, deleteProject({id: 1}))).toEqual({
      projects: [],
      currentProjectId: 0
    })
  })
  
  test('should delete only correct project', () => { 
    const previousState = {
      projects: [
        {
          title: '1',
          id: 1,
          tasks: {
            queueTasks: [],
            developmentTasks: [],
            doneTasks: [],
          }
        },
        {
          title: '2',
          id: 2,
          tasks: {
            queueTasks: [],
            developmentTasks: [],
            doneTasks: [],
          }
        }
      ],
      currentProjectId: 1
    }
    expect(projectReducer(initialState, deleteProject({id: 2}))).toEqual(initialState)
    expect(projectReducer(previousState, deleteProject({id: 2}))).toEqual({
      projects: [
        {
          title: '1',
          id: 1,
          tasks: {
            queueTasks: [],
            developmentTasks: [],
            doneTasks: [],
          }
        },
      ],
      currentProjectId: 1
    })
  })
})

describe('setCurrentProjectId', () => { 
  let state = {
    projects: [],
    currentProjectId: 1
  }
  test('should change project id', () => { 
    expect(projectReducer(state, setCurrentProjectId({projectId: '2'}))).toEqual({
      projects: [],
    currentProjectId: 2
    })
   })
})

describe('changeTaskStatus', () => { 
  let state: State = {
    projects: [{
      title: '1',
      id: 1,
      tasks: {
        queueTasks: [
          {
            id: 0,
            description: '',
            priority: 'low',
            text: '1',
            subTasks: []
          },
          {
            id: 2,
            description: '',
            priority: 'low',
            text: '2',
            subTasks: []
          },
        ],
        developmentTasks: [],
        doneTasks: []
      }
    }],
    currentProjectId: 1
  }
   test('should change task only for correct task', () => { 
    expect(projectReducer(state, changeTaskStatus({
      currentStatus: "Queue",
      id: 2,
      nextStatus: "Development"
    }))).toEqual({
      projects: [{
        title: '1',
        id: 1,
        tasks: {
          queueTasks: [
            {
              id: 0,
              description: '',
              priority: 'low',
              text: '1',
              subTasks: []
            },
            
          ],
          developmentTasks: [
            {
              id: 2,
              description: '',
              priority: 'low',
              text: '2',
              subTasks: []
            },
          ],
          doneTasks: []
        }
      }],
      currentProjectId: 1
    })
    })
 })
