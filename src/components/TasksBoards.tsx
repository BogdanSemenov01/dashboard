import React, { FC, useEffect } from 'react'
import Section from './Section'
import Flex from './styled/CommonStyledComponents'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useParams } from 'react-router-dom'
import Task from './Task'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { setCurrentProjectId } from '../redux/projectsSlice'

const TasksBoards: FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects)
  const dispatch = useDispatch()
  const projectId = useParams().id
  useEffect(() => {
    dispatch(setCurrentProjectId({projectId}))
  }, [])
  
  const currentProject:any = [] 
  projects.map((p:any) => {
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
          />
        )
      })
    }
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Flex justifyContent='space-between' gap='10px'>
          <Section title={'Queue'}>
            {renderTasks('Queue', queueTasks)}
          </Section>
          <Section title={'Development'}>
          {renderTasks('Development', developmentTasks)}
          </Section>
          <Section title={'Done'}>
          {renderTasks('Done', doneTasks)}
          </Section>
        </Flex>
      </DndProvider>
    </div>
  )
}

export default TasksBoards