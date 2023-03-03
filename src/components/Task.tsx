import React, { useContext, useRef, useState } from "react"
import type { FC } from "react"
import { useDrag, useDrop } from "react-dnd/dist/hooks"
import styled from "styled-components"
import DeleteButton from "./common/DeleteButton"
import { deleteTask } from "../redux/projectsSlice"
import { ModalContext } from "../context/ModalContext/ModalContext"
import ChangeTaskForm from "./common/Forms/ChangeTaskForm"
import { useAppDispatch } from "../redux/store"

const StyledTask = styled.div`
  background-color: white;
  width: 90%;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  position: relative;
  font-size: 20px;
  border-radius: 3px;
  color: ${(props) => props.theme.title};
  & > div {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  & > div > button {
    color: ${(props) => props.theme.title};
    background: none;
    border: 1px solid ${(props) => props.theme.background};
    border-radius: 5px;
    &:hover {
      background: ${(props) => props.theme.background};
    }
  }
`

export interface TaskProps {
  id: any
  text: string
  index: number
  status: string
  description: string
  priority: string
  theme?: object
  subTasks: object[]
}

const StyledPriorityFragment = styled("p")<{ color: string | undefined }>`
  color: ${(props) => props.color};
  margin: 0;
  padding: 0;
  font-weight: 700;
`

const PriorityBar = ({ priority }: any) => {
  let color
  let content
  switch (priority) {
    case "low":
      content = "!"
      color = "green"
      break
    case "middle":
      content = "!!"
      color = "orange"
      break
    case "high":
      content = "!!!"
      color = "red"
      break

    default:
      break
  }
  return (
    <StyledPriorityFragment color={color}>{content}</StyledPriorityFragment>
  )
}

const StyledProgressBar = styled("div")<{ result: number }>`
  width: ${(props) => props.result}px;
  height: 30px;
  background-color: lightgray;
  opacity: 0.3;
  position: absolute;
  left: 0%;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;
  & > span {
    padding: 0 5px;
  }
`

const ProgressBar = ({ progressPercent }: any) => {
  let resultWidth = 280 * (progressPercent / 100)
  return (
    <StyledProgressBar result={resultWidth}>
      <span>{progressPercent > 0 && Math.round(progressPercent) + " %"}</span>
    </StyledProgressBar>
  )
}

const Task = (props: TaskProps) => {
  const completeSubtasks = props.subTasks.filter(
    (t: any) => t.isComplete
  ).length
  const allSubtasks = props.subTasks.length
  const progressPercent = (completeSubtasks / allSubtasks) * 100

  const dispatch = useAppDispatch()
  const { openModal } = useContext(ModalContext)

  const onClickDeleteTask = () => {
    dispatch(deleteTask({ section: props.status, taskId: props.id }))
  }

  const onClickRenameTask = () => {
    openModal({
      title: props.text,
      children: <ChangeTaskForm taskData={props} />,
    })
  }

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: () => {
      return { id: props.id, index: props.index, status: props.status }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  return (
    <>
      <StyledTask style={{ opacity }} ref={drag} theme={props.theme}>
        <ProgressBar progressPercent={progressPercent} />
        <div>
          <PriorityBar priority={props.priority} />
          {props.text}
        </div>
        <div className="controls">
          <button onClick={onClickRenameTask}>s</button>
          <DeleteButton onClick={onClickDeleteTask} />
        </div>
      </StyledTask>
    </>
  )
}

export default Task
