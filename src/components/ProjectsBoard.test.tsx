import { render, screen } from "@testing-library/react"
import ProjectsBoard from "./ProjectsBoard"
import * as appHooks from "../redux/store"
import { Project } from "../redux/projectsSlice"
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import userEvent from "@testing-library/user-event"
const mockedDispatch = jest.spyOn(appHooks, "useAppDispatch")
const mockedSelector = jest.spyOn(appHooks, "useAppSelector")
const dispatch = jest.fn()

const projects: Array<Project> = [
  {
    title: "DashBoard",
    id: 1,
    tasks: {
      queueTasks: [],
      developmentTasks: [],
      doneTasks: [],
    },
  },
]

export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

describe("Projects Board", () => {
  it("should render projects board component", () => {
    mockedSelector.mockReturnValue(projects)
    const component = render(
      <MemoryRouter initialEntries={['/']}>
        <ProjectsBoard />
      </MemoryRouter>
    )
    expect(component).toMatchSnapshot()
  })
  it("should change location after click", () => {
    mockedSelector.mockReturnValue(projects)
    render(
      <MemoryRouter initialEntries={['/']}>
        <ProjectsBoard />
        <LocationDisplay />
      </MemoryRouter>
    )
    const link = screen.getByText('DashBoard')
    userEvent.click(link)
    expect(screen.getByTestId('location-display').innerHTML).toEqual('/1')
  })
})
