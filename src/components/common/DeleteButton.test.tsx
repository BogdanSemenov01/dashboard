import { render, screen } from "@testing-library/react"
import DeleteButton from "./DeleteButton"
import userEvent from "@testing-library/user-event"

const deleteFC = jest.fn()

describe("Delete button", () => {
  test("should render delete button", () => {
    const component = render(<DeleteButton onClick={deleteFC} />)
    expect(component).toMatchSnapshot()
  })
  test("should call onclick function", () => {
    render(<DeleteButton onClick={deleteFC} />)
    userEvent.click(screen.getByRole("button"))
    expect(deleteFC).toHaveBeenCalledTimes(1)
  })
})
