import { render, screen, waitFor } from "@testing-library/react";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";

const Element = () => {
  return <div>Test</div>  
}

describe('Modal window', () => {
  it('should render modal window component', () => {
    const component = render(<Modal title='Modal'><Element /></Modal>)
    expect(component).toMatchSnapshot()
  })

  it ('should call close function on close',  () => {
    render(<Modal title='Modal'><Element /></Modal>)
    const button = screen.getByRole('button')
    userEvent.click(button)


    expect(screen.queryByTestId('modal')).toBeNull()
  })

})