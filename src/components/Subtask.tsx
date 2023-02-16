import React from 'react'
import { UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';

const StyledSubtaskWrapper = styled('div')`
  height: 105px;
  overflow-y: auto;
`;

const StyledSubTask = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #d3d3d33e;
  margin-bottom: 3px;
  border-radius: 3px;
  & > div {
    color: red;
    opacity: 0.5;
    cursor: pointer;  
    margin-right: 5px;
  }
  & > span {
    flex: 1;
  }
`;

const Subtask = (props: {
  subTasks: any
  register: UseFormRegister<{
    text: string;
    description: string;
    priority: any;
    subTasks: any[];
  }>
  remove: UseFieldArrayRemove
}) => {

  
  return (
    <StyledSubtaskWrapper>
      {props.subTasks.map((s: {id: number, text: string}, index: number) => {
        return <StyledSubTask key={s.id}>
          <input type="checkbox" {...props.register(`subTasks.${index}.isComplete`)}/>
            <span>{s.text}</span>
              <div onClick={()=> props.remove(index)}>x</div>
          </StyledSubTask>
      })}
    </StyledSubtaskWrapper>
  )
}

export default Subtask