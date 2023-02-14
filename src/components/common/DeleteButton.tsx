import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../../redux/projectsSlice'
import styled from 'styled-components';

const StyledButton = styled('button')<StyledButtonProps>`
  cursor: pointer;
`;

type StyledButtonProps = {
  id: string | undefined
}

type DeleteButtonProps = {
  section?: string
  id: string | undefined
  onClick: (event: React.MouseEvent) => void
}

const DeleteButton = (props: DeleteButtonProps) => {

  return (
    <StyledButton
      data-section={props.section} 
      id={props.id}
      onClick={props.onClick}
      >x</StyledButton>
  )
}

export default DeleteButton