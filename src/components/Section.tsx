import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import Flex from './styled/CommonStyledComponents';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { changeTaskStatus, createNewTask } from '../redux/projectsSlice';
import { useParams } from 'react-router-dom';
import AddButton from './common/AddButton';
interface Props {
  title?: string,
  tasks?: object,
  colorSC: {
    border: string 
    background: string
    title: string
  },
  children: any,
}

const SectionWrapper = styled.div`
  width: 300px;
  height: 60vh;
  border: 1px solid ${props => props.theme.border};
  border-radius: 5px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.title};
`
const SectionTitle = styled.div`
  font-size: 35px;
`;

const Section = (props: Props) => {
  const dispatch = useDispatch()
  const projectId = useParams().id

  
  const [collectedProps, drop ] = useDrop(() => ({
    accept: 'task',
    drop: (item:any) => {
      dispatch(changeTaskStatus({id: item.id, currentStatus: item.status, nextStatus: props.title }))
  }
}))

const updateChildrenWithProps = React.Children.map(
  props.children,
  (child, i) => {
    return React.cloneElement(child, {
      theme: props.colorSC
    });
  }
);

  return (
    <SectionWrapper ref={drop} theme={props.colorSC}>
      <Flex flexDirection='column' gap='3px'>
        <SectionTitle>{props.title}</SectionTitle>
        {updateChildrenWithProps}
        <AddButton section={props.title} theme={props.colorSC} callback={createNewTask}/>
      </Flex>
    </SectionWrapper>
  )
}

export default Section