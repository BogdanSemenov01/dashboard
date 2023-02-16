import React, { FC, useEffect } from 'react'
import Section from './Section'
import Flex from './styled/CommonStyledComponents'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { useParams } from 'react-router-dom'
import Task from './Task'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Project, setCurrentProjectId } from '../redux/projectsSlice'

const blueCS = {
  border: 'rgb(38, 131, 182)',
  background: 'rgba(45, 138, 186, 0.2)',
  title: 'rgb(38, 131, 182)'
}
const orangeCS = {
  border: 'rgb(255, 121, 25)',
  background: 'rgba(255, 123, 29, 0.212)',
  title: 'rgb(255, 121, 25)',
}
const greenCS = {
  border: 'rgb(29, 182, 70)',
  background: 'rgba(50, 202, 90, 0.2)',
  title: 'rgb(29, 182, 70)'
}


const TasksBoards: FC = () => {
  const projects = useAppSelector((state: RootState) => state.projects.projects)
  const dispatch = useAppDispatch()
  const projectId = useParams().id
  useEffect(() => {
    dispatch(setCurrentProjectId({projectId}))
  }, [])
  
  const currentProject: Array<any> = [] 
  projects.map((p:Project) => {
    if(p.id.toString() === projectId) {
      currentProject.push(p)
    }
  })


  const tasks = currentProject[0].tasks
  const queueTasks = tasks.queueTasks
  const developmentTasks = tasks.developmentTasks
  const doneTasks = tasks.doneTasks

  const renderTasks = (sectionTitle:string, tasks: []) => {
    if (tasks) {
      return tasks
      .map((t:any, index:any) => {
        return (
          <Task 
            id={t.id} 
            text={t.text} 
            key={t.id} 
            index={index} 
            status={sectionTitle}
            description={t.description}
            priority={t.priority}
            subTasks={t.subTasks}
            />
        )
      })
    }
  }


  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Flex justifyContent='space-between' gap='10px'>
          <Section title={'Queue'} colorSC={blueCS}>
            {renderTasks('Queue', queueTasks)}
          </Section>
          <Section title={'Development'} colorSC={orangeCS}>
            {renderTasks('Development', developmentTasks)}
          </Section>
          <Section title={'Done'} colorSC={greenCS}>
            {renderTasks('Done', doneTasks)}
          </Section>
        </Flex>
      </DndProvider>
    </div>
  )
}

export default TasksBoards