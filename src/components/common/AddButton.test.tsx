import { fireEvent, render, screen } from "@testing-library/react"
import AddButton from "./AddButton"
import * as AppDispatch from '../../redux/store';

jest.mock('../../redux/store')
const mockedDispatch = jest.spyOn(AppDispatch, 'useAppDispatch')

describe('AddButton', () => { 
  test('should create add button' , () => {
    const component = render(<AddButton />)
    expect(component).toMatchSnapshot()
  })
  
  test('should render button', () => { 
    render(<AddButton />)
    const element = screen.getByRole('button')
    expect(element).toBeEnabled
    expect(element).toHaveTextContent('+')
  })
  test('should button been hide after click', () => { 
    render(<AddButton />)
    const element = screen.getByRole('button')
    fireEvent.click(element)
    expect(element).not.toBeInTheDocument()  
   })
 })