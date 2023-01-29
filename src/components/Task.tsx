import React, { useRef } from 'react'
import type { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd/dist/hooks';
import styled from 'styled-components';

const StyledTask = styled.div`
  background-color: lightgray;
  width: 100%;
  margin: 5px 0;
`;

export interface TaskProps {
  id: any
  text: string
  index: number
  status: string
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
      <StyledTask style={{opacity}} ref={drag}>
        {props.text}
      </StyledTask>
    </>
  )
}

export default Task