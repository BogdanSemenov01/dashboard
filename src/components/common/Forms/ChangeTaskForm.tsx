import React from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeTask } from '../../../redux/projectsSlice';
import Subtask from '../../Subtask';
import AddButton from '../AddButton';

interface IFormInput {
  text: string
  priority: string
  description: string
  preventDefault: () => void
}

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
    /* margin: 15px 0; */
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

const ChangeTaskForm = (props:any) => {

  const dispatch = useDispatch()

  
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

  const { fields, append } = useFieldArray({
    control,
    name: "subTasks"
  });

  const onSubmit = (data:any, e: any) => {
    dispatch(changeTask({
      taskId: props.taskData.id,
      section: props.taskData.status,
      newText: data.text,
      newDescription: data.description,
      newPriority: data.priority,
      newSubTasks: data.subTasks
    }))

  };
  const onError = (errors: any, e: any) => console.log(errors, e);



  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
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
        <Subtask subTasks={fields} register={register}/>
        <AddButton action={append}/>
      </StyledGoalsBlock>
      <button>Accept</button>
    </StyledForm>
  )
}

export default ChangeTaskForm