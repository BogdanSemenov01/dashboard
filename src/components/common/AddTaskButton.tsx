import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewTask } from '../../redux/projectsSlice'

const AddTaskButton = (props: any) => {

  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [isInput, setIsInput] = useState(false)
  const onClickCreateNewTask = () => {
    setIsInput(true)
  }

  const changeInputValue = (e:any) => {
    setInputValue(e.target.value)
  }
  const onEnterPressed = (e:any) => {
    if (e.key === 'Enter') {
      setIsInput(false)
      dispatch(createNewTask({status: e.target.id, text: e.target.value}))
      setInputValue('')
    }
    if (e.key === 'Escape') {
      setIsInput(false)
      setInputValue('')
    }
  }

  return (
    isInput ? (<input 
      autoFocus
      id={props.section}
      value={inputValue} 
      onChange={changeInputValue}
      onKeyDown={onEnterPressed}/>) : 
    (
      <button onClick={onClickCreateNewTask}>Add Task</button>
    )
  )
}

export default AddTaskButton