import { render, screen } from "@testing-library/react"
import TasksBoards from "./TasksBoards"
import * as appHooks from "../redux/store"
import { Project } from "../redux/projectsSlice"
import * as useParams from "react-router-dom"

jest.mock("../redux/store")
jest.mock("react-router-dom")

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
const mockedParams = jest.spyOn(useParams, "useParams")

describe("Task Board", () => {
  it("should render task board component", () => {
    const dispatch = jest.fn()
    mockedDispatch.mockReturnValue(dispatch)
    mockedSelector.mockReturnValue(projects)
    mockedParams.mockReturnValue({ id: "1" })
    const component = render(<TasksBoards />)
    expect(component).toMatchSnapshot()
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
