import { render } from "@testing-library/react"
import TasksBoards from "./TasksBoards"
import * as appHooks from "../redux/store"
import { Project } from "../redux/projectsSlice"
import { MemoryRouter } from "react-router-dom"

jest.mock("../redux/store")

const projects: Array<Project> = [
  {
    title: "DashBoard",
    id: 1,
    tasks: {
      queueTasks: [
        {
          id: 1,
          text: "any",
          description: "any",
          priority: "low",
          subTasks: [],
        },
      ],
      developmentTasks: [
        {
          id: 2,
          text: "any",
          description: "any",
          priority: "low",
          subTasks: [],
        },
      ],
      doneTasks: [
        {
          id: 3,
          text: "any",
          description: "any",
          priority: "low",
          subTasks: [],
        },
      ],
    },
  },
]

const mockedDispatch = jest.spyOn(appHooks, "useAppDispatch")
const mockedSelector = jest.spyOn(appHooks, "useAppSelector")

describe("Task Board", () => {
  // it("should render task board component", () => {
  //   mockedSelector.mockReturnValue(projects)
  //   render(
  //       <TasksBoards />
  //   )
  // })
})
