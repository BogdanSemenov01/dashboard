import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../redux/projectsSlice'
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
`;
const DeleteButton = (props: any) => {
  const dispatch = useDispatch()

  return (
    <StyledButton
      data-section={props.section} 
      id={props.id}
      onClick={props.onClick}
      >x</StyledButton>
  )
}

export default DeleteButton