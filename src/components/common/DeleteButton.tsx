import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../redux/projectsSlice'

const DeleteButton = (props: any) => {
  const dispatch = useDispatch()
  const onClickAction = () => {
    dispatch(deleteTask({section: props.section, taskId: props.id}))
  }
  return (
    <button
      data-section={props.section} 
      id={props.id}
      onClick={onClickAction}
      >x</button>
  )
}

export default DeleteButton