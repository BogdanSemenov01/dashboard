import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import styled from 'styled-components';
import { changeTask } from '../../../redux/projectsSlice';
import Subtask from '../../Subtask';
import AddButton from '../AddButton';
import { useAppDispatch } from '../../../redux/store';

const StyledForm = styled('form')<{onSubmit: any}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > input{
    font-size: 20px;
  }
  & > textarea{
    font-size: 20px;
    
  }
  & > select {
    font-size: 20px;

  }
  & > label {
    font-size: 20px;
  }
  &>button {
    margin-top: 10%;
    width: 100px;
    height: 50px;
  }
`

const StyledGoalsBlock = styled('div')`
  & > p {
    padding: 0;
    margin: 0;
    font-size: 20px;
    text-align: center;
  }
`;

const ChangeTaskForm = (props: {
  taskData: {
    id: number
    status: string
    text: string
    description: string
    priority: string
    subTasks: Array<{}>
  }
}) => {

  const dispatch = useAppDispatch()



  const {register, control, handleSubmit } = useForm({
    defaultValues: {
      text: props.taskData.text,
      description: props.taskData.description,
      priority: props.taskData.priority,
      subTasks: [
        ...props.taskData.subTasks
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks"
  });

type Data = {
  text: string, 
  description: string, 
  priority: 'low' | 'middle' | 'high', 
  subTasks: Array<{id: number, text: string, isComplete: boolean}>
}

  const onSubmit = (data: any) => {
    dispatch(changeTask({
      taskId: props.taskData.id,
      section: props.taskData.status,
      newText: data.text,
      newDescription: data.description,
      newPriority: data.priority,
      newSubTasks: data.subTasks
    }))
   
  };



  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} role='form'>
        <label htmlFor="text">Change current task text</label>
        <input  {...register('text')} />
        <label htmlFor="priority">Select priority</label>
        <select {...register('priority')}>
          <option value="low">low</option>
          <option value="middle">middle</option>
          <option value="high">high</option>
        </select>
        <label htmlFor="description">Change description</label>
        <textarea  {...register('description')} placeholder='Description'/>
      <StyledGoalsBlock>
        <p>Goals</p>
        <Subtask subTasks={fields} register={register} remove={remove}/>
        <AddButton action={append}/>
      </StyledGoalsBlock>
      <button role='submitButton'>Accept</button>
    </StyledForm>
  )
}

export default ChangeTaskForm