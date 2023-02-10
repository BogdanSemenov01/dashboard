import React from 'react'


const Subtask = (props: any) => {

  
  return (
    <div>
      {props.subTasks.map((s:any, index: number) => {
        return <div key={s.id}>
          <input type="checkbox" {...props.register(`subTasks.${index}.isComplete`)}/>
            <span>{s.text}</span>
          </div>
      })}
    </div>
  )
}

export default Subtask