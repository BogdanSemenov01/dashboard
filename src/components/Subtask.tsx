import React from 'react'
import styled from 'styled-components';

const StyledSubtaskWrapper = styled('div')`
  height: 210px;
  overflow-y: auto;
`;

const Subtask = (props: any) => {

  
  return (
    <StyledSubtaskWrapper>
      {props.subTasks.map((s:any, index: number) => {
        return <div key={s.id}>
          <input type="checkbox" {...props.register(`subTasks.${index}.isComplete`)}/>
            <span>{s.text}</span>
          </div>
      })}
    </StyledSubtaskWrapper>
  )
}

export default Subtask