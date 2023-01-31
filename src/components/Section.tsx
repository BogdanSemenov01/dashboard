import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import Flex from './styled/CommonStyledComponents';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { changeTaskStatus } from '../redux/projectsSlice';
import { useParams } from 'react-router-dom';
import AddTaskButton from './AddTaskButton';
interface Props {
  title?: string,
  tasks?: object,
  children: any,
}

const SectionWrapper = styled.div`
  width: 300px;
  border: 1px solid black;
  height: 60vh;
`
const Section = (props: Props) => {
  const dispatch = useDispatch()
  const projectId = useParams().id
  
  const [collectedProps, drop ] = useDrop(() => ({
    accept: 'task',
    drop: (item:any) => {
      dispatch(changeTaskStatus({id: item.id, currentStatus: item.status, nextStatus: props.title }))
  }
}))

  return (
    <SectionWrapper  ref={drop}>
      <Flex flexDirection='column'>
        <div>{props.title}</div>
        {props.children}
        <AddTaskButton section={props.title}/>
      </Flex>
    </SectionWrapper>
  )
}

export default Section