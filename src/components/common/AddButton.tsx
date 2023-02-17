import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewTask } from '../../redux/projectsSlice'
import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props => props.theme.background};
  opacity: 0.5;
  border: none;
  border-radius: 3px;
  width: 280px;
  height: 30px;
  font-size: 25px;
  color: ${props => props.theme.title};
  &:hover {
    opacity: 1;
    transition: 0.4s;
  }
`;

const StyledInput = styled.input`
  padding: 0 5px;
  margin: 0;
  font-size: 20px;
  height: 30px;
  width: 270px;
  outline: none;
  border: none;
`;

const AddButton = (props: any) => {

  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [isInput, setIsInput] = useState(false)
  const onClickCreateNewTask = () => {
    setIsInput(true)
  }
  const changeInputValue = (e: any) => {

    setInputValue(e.target.value)
  }
  const onEnterPressed = (e:any) => {
    if (e.key === 'Enter') {
      setIsInput(false)
      if (props.callback) {
        dispatch(props.callback({status: e.target.id, text: e.target.value}))
      }
      props.action({
        id: Date.now(),
        text: e.target.value,
        isComplete: false
      })
      setInputValue('')
    }
    if (e.key === 'Escape') {
      setIsInput(false)
      setInputValue('')
    }
  }

  return (
    isInput ? (<StyledInput 
      autoFocus
      id={props.section}
      value={inputValue} 
      onChange={changeInputValue}
      onKeyDown={onEnterPressed}/>) : 
    (
      <StyledButton onClick={onClickCreateNewTask} theme={props.theme}>+</StyledButton>
    )
  )
}

export default AddButton