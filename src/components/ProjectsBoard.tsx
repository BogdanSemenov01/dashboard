import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import Flex from './styled/CommonStyledComponents'
import { createProject, deleteProject } from '../redux/projectsSlice'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const StyledProject = styled.div`
  border: 1px solid gray;
  font-size: 20px;  
  margin: 5px 0;
  padding: 0 5px;
  width: 250px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ProjectsBoard = () => {
  const projects = useSelector((state: RootState) => state.projects.projects)
  const dispatch = useDispatch()

  const createNewProject = () => {
    dispatch(createProject())
  }

  const onClickDeleteProject = (e:any) => {
    dispatch(deleteProject({id: e.target.id}))
  }
  return (
    <div>
        <Flex flexDirection='column'>
      <div>
        {projects.map((p:any) => {
          return <StyledProject key={p.id}>
            <Link to={'/' + p.id}>
              {p.title}
            </Link>
            <div id={p.id.toFixed()} onClick={onClickDeleteProject}>x</div>
            </StyledProject>
        })}
      </div>
      <StyledProject onClick={createNewProject}>
        Create new project +
      </StyledProject>
        </Flex>
    </div>
  )
}

export default ProjectsBoard