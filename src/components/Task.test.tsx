import { render } from "@testing-library/react"
import Task from "./Task"
import * as appDispatch from "../redux/store"
import * as dndHooks from 'react-dnd/dist/hooks'

const data = {
  id: 1,
  text: "any",
  index: 1,
  status: "Queue",
  description: "any",
  priority: "low",
  subTasks: [],
}

jest.mock("../redux/store")
jest.mock('react-dnd/dist/hooks')
const mockedDispatch = jest.spyOn(appDispatch, 'useAppDispatch')
const mockedDrag = jest.spyOn(dndHooks, 'useDrag')

describe("Task component", () => {
  it("should render component", () => {
    const component = render(
      <Task
        id={data.id}
        text={data.text}
        index={data.index}
        status={data.status}
        description={data.description}
        priority={data.priority}
        subTasks={data.subTasks}
      />
      )
    expect(component).toMatchSnapshot()
  })

})
