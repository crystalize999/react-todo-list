import React, { ChangeEvent, KeyboardEvent } from "react";
import { TaskType } from "./App";
import { TodolistPropsInterface } from "./App";
import { useState } from "react";


export function Todolist(props: TodolistPropsInterface) {
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const onNewTitleChangeHandler = (e : ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
  } 
  const onKeyDownHandler = (e :KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter"){
        props.addTask(newTaskTitle);
        setNewTaskTitle("")
      }
  }
  const addNewTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("")
  }
  const onAllClickHandler = () => { props.changeFilter("all")}
  const onActiveClickHandler = () => { props.changeFilter("active")}
  const onCompletedClickHandler = () => { props.changeFilter("completed")}

  
    return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input value= {newTaskTitle}
                 onChange={onNewTitleChangeHandler }
                 onKeyDown={ onKeyDownHandler}/>
          <button onClick={addNewTask}>+</button>
        </div>
        <ul>
          {
            props.tasks.map( (t) => {
              const onRemoveHandler = () => { props.removeTask(t.id)}
              return <li key={t.id}><input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
              </li>
            })
          }
          
        </ul>
        <div>
          <button onClick={onAllClickHandler }>All</button>
          <button onClick={onActiveClickHandler }>Active</button>
          <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
      </div>
    );
  }
  
  export default Todolist;
