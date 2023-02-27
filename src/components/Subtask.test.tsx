import { render, screen } from "@testing-library/react";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import type {SubtaskType} from '../redux/projectsSlice'
import Subtask from "./Subtask";

const register = jest.fn()
const remove = jest.fn()
const subtasks: Array<SubtaskType> = [
  {id: 1, text: 'any', isComplete: false}
]

describe ('Subtask', () => {
  it('should render subtask component', () => {
    const component = render(<Subtask subTasks={[]} register={register} remove={remove}/>)
    expect(component).toMatchSnapshot()
  });
  it ('should check checkbox', () => {
    render(<Subtask subTasks={subtasks} register={register} remove={remove}/>)
    const input = screen.getByRole('checkbox')
    userEvent.click(input)
    expect(input).toBeChecked()  
  });
  it ('should call remove after click x', () => {
    render(<Subtask subTasks={subtasks} register={register} remove={remove}/>)
    const button = screen.getByText('x')
    userEvent.click(button)
    expect(remove).toHaveBeenCalledTimes(1)
  });
});