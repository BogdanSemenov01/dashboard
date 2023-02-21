import { fireEvent, render, screen } from "@testing-library/react"
import ChangeTaskForm from "./ChangeTaskForm"
import * as reduxHooks from '../../../redux/store'

jest.mock('../../../redux/store')

const mockedDispatch = jest.spyOn(reduxHooks, 'useAppDispatch')

const props = {
  id: 1,
  status: 'Queue',
  text: '1',
  description: '',
  priority: 'low',
  subTasks: []
}

describe('ChangeTaskFrom', () => { 
  test('should create ChangeTaskForm with taskData', () => { 
    const component = render(<ChangeTaskForm taskData={props}/>)
    expect(component).toMatchSnapshot() 
  })
  
  test('should dispatch after submit form', () => {

    render(<ChangeTaskForm taskData={props}/>)

    const dispatch = jest.fn() 

    mockedDispatch.mockReturnValue(dispatch)

    fireEvent.click(screen.getByRole('submitButton'))

    expect(dispatch).toHaveBeenCalledTimes(1)
  }) 
})