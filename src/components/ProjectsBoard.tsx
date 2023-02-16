import React from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { Project, createProject, deleteProject } from '../redux/projectsSlice'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import DeleteButton from './common/DeleteButton'
import AddButton from './common/AddButton'

const StyledProject = styled.div`
  border-radius: 3px;
  font-size: 20px;  
  padding: 0 5px;
  width: 270px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;
  color: rgba(218, 78, 101, 0.705);
  &>a {
    color: rgba(218, 78, 101, 0.705);
    text-decoration: none;
  }
  &>button{
    color: rgb(218, 37, 67);
    height: 19px;
    background: none;
    border: 1px solid rgba(218, 78, 101, 0.705);
    border-radius: 5px;
    &:hover {
      background: rgba(218, 78, 101, 0.705);
    }
  }
`;

const StyledProjectsBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 60vh;
  background-color: rgba(218, 78, 101, 0.705);
  border: 2px solid rgb(218, 37, 67);
  padding: 10px;
  border-radius: 5px;
`;

const StyledProjectsBoardTitle = styled.div`
  color: rgb(218, 37, 67);
  font-weight: 500;
  text-align: center;
  font-size: 35px;
`;

const theme = {
  background: 'rgba(218, 78, 101, 0.705)',
  title: 'rgb(218, 37, 67)'
}

const ProjectsBoard = (): React.ReactElement => {

  const projects = useAppSelector((state: RootState) => state.projects.projects)
  const dispatch = useAppDispatch()

  const onClickDeleteProject = (event: any) => {
    dispatch(deleteProject({id: event.target.id}))
  }

  return (
    <div>
        <StyledProjectsBoard>
        <StyledProjectsBoardTitle>Projects</StyledProjectsBoardTitle>
        {projects.map((p: Project) => {
          return <StyledProject key={p.id}>
            <Link to={'/' + p.id}>
              {p.title}
            </Link>
            <DeleteButton onClick={onClickDeleteProject} id={p.id.toFixed()} />
            </StyledProject>
        })}
      <AddButton callback={createProject} theme={theme}/>
        </StyledProjectsBoard>
    </div>
  )
}

export default ProjectsBoard