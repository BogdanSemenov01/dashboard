import React, { useRef, useState } from 'react'
import type { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import styled from 'styled-components';
import DeleteButton from './common/DeleteButton';
import Flex from './styled/CommonStyledComponents';
import { useDispatch } from 'react-redux';
import { deleteTask, renameTask } from '../redux/projectsSlice';

const StyledTask = styled.div`
  background-color: white;
  width: 90%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  font-size: 20px;
  border-radius: 3px;
  color: ${props => props.theme.title};
  &>div {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  &>div>button {
    color: ${props => props.theme.title};
    background: none;
    border: 1px solid ${props => props.theme.background};
    border-radius: 5px;
    &:hover {
      background: ${props => props.theme.background};
    }
  }
`;

export interface TaskProps {
  id: any
  text: string
  index: number
  status: string
  theme?: object
}

interface DragItem {
  index: number
  id: string
  type: string
}


const Task: FC<TaskProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const onClickDeleteTask = () => {
    dispatch(deleteTask({section: props.status, taskId: props.id}))
  }

  const onClickRenameTask = () => {
    setIsInput(true)
  }

  const changeInputValue = (e:any) => {
    setInputValue(e.target.value)
  }

  const onEnterPressed = (e:any) => {
    if (e.key === 'Enter') {
      setIsInput(false)
      dispatch(renameTask({section: props.status, taskId: e.target.id, newText: e.target.value}))
      setInputValue('')
    }
    if (e.key === 'Escape') {
      setIsInput(false)
      setInputValue('')
    }
  }

  const [inputValue, setInputValue] = useState(props.text)
  const [isInput, setIsInput] = useState(false)
  
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: () => {
      return { id: props.id, index: props.index, status: props.status }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  return (
    <>
      <StyledTask style={{opacity}} ref={drag} theme={props.theme}>
        {isInput ? 
        <input 
          autoFocus
          value={inputValue}
          onChange={changeInputValue}
          onKeyDown={onEnterPressed}
          id={props.id}
        /> : props.text}
        <div className="controls">
          <button onClick={onClickRenameTask}>r</button>
          <DeleteButton onClick={onClickDeleteTask}/>
        </div>
      </StyledTask>
    </>
  )
}

export default Task