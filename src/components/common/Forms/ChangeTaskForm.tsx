import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeTask } from '../../../redux/projectsSlice';

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
  &>label {
    font-size: 25px;
    margin: 15px 0;
  }
  &>button {
    margin-top: 10%;
    width: 100px;
    height: 50px;
  }
`

const ChangeTaskForm = (props:any) => {

  const dispatch = useDispatch()

  const {register, handleSubmit} = useForm<IFormInput>({
    defaultValues: {
      text: props.taskData.text,
      description: props.taskData.description,
      priority: props.taskData.priority,
    }
  })

  const onSubmit = (data:any, e: any) => {
    dispatch(changeTask({
      taskId: props.taskData.id,
      section: props.taskData.status,
      newText: data.text,
      newDescription: data.description,
      newPriority: data.priority

    }))

  };
  const onError = (errors: any, e: any) => console.log(errors, e);



  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onError)}>
      <label htmlFor="text">Change current task text</label>
      <input  {...register('text')} />
      <label htmlFor="description">Change description</label>
      <textarea  {...register('description')} placeholder='Description'/>
      <label htmlFor="priority">Select priority</label>
      <select {...register('priority')}>
        <option value="low">low</option>
        <option value="middle">middle</option>
        <option value="high">high</option>
      </select>
      <button>Accept</button>
    </StyledForm>
  )
}

export default ChangeTaskForm