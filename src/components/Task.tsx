import React, { useRef } from 'react'
import type { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import styled from 'styled-components';
import DeleteButton from './common/DeleteButton';
import Flex from './styled/CommonStyledComponents';

const StyledTask = styled.div`
  background-color: white;
  width: 90%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  /* font-weight: 500; */
  font-size: 20px;
  border-radius: 3px;
  color: ${props => props.theme.title};
  &>button{
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
        <DeleteButton section={props.status} id={props.id}/>
      </StyledTask>
    </>
  )
}

export default Task