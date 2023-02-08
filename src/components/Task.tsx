import React, { useContext, useRef, useState } from 'react'
import type { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import styled from 'styled-components';
import DeleteButton from './common/DeleteButton';
import Flex from './styled/CommonStyledComponents';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/projectsSlice';
import { ModalContext } from '../context/ModalContext/ModalContext';
import ChangeTaskForm from './common/Forms/ChangeTaskForm';
import icon from '../assets/icons/139-1397650_gears-png-file-transparent-background-gear-icon.png'

const StyledTask = styled.div`
  background-color: white;
  width: 90%;
  min-height: 30px;
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
  description: string
  priority: string
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
  const {openModal} = useContext(ModalContext)


  const onClickDeleteTask = () => {
    dispatch(deleteTask({section: props.status, taskId: props.id}))
  }

  const onClickRenameTask = () => {
    openModal({
      title: 'Change your task',
      children: <ChangeTaskForm taskData={props}/>,
    })
  }
  
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
        {props.text}
        <div className="controls">
          <button onClick={onClickRenameTask}>
            s
          </button>
          <DeleteButton onClick={onClickDeleteTask}/>
        </div>
      </StyledTask>
    </>
  )
}

export default Task