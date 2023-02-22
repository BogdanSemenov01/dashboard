import { fireEvent, render, screen } from "@testing-library/react"
import ChangeTaskForm from "./ChangeTaskForm"
import * as reduxHooks from '../../../redux/store'
import * as actions from '../../../redux/projectsSlice'

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
    const mockedActions = jest.spyOn(actions, 'changeTask')

    render(<ChangeTaskForm taskData={props}/>)

    const dispatch = jest.fn() 

    mockedDispatch.mockReturnValue(dispatch)

    const form = screen.getByRole('form')
    fireEvent.submit(form)

    // expect(dispatch).toHaveBeenCalledTimes(1)
    expect(mockedActions).toHaveBeenCalledTimes(1)
  }) 
})