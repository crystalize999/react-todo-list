import React, { ChangeEvent, KeyboardEvent } from "react";
import { TaskType } from "./App";
import { TodolistPropsInterface } from "./App";
import { useState } from "react";
import { error } from "console";


export function Todolist(props: TodolistPropsInterface) {

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState(null)

  const onNewTitleChangeHandler = (e : ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value)
  } 
  const onKeyDownHandler = (e :KeyboardEvent<HTMLInputElement>) => {
    if ( newTaskTitle.trim() === ""){
      return;
    }
      if (e.code === "Enter"){
        props.addTask(newTaskTitle);
        setNewTaskTitle("")
      }
  }
  const addNewTask = () => {
    if (newTaskTitle.trim() === ""){
      return;
    }
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
                 onKeyDown={ onKeyDownHandler}
                 className={error ? "error" : ""}/>
          <button onClick={addNewTask}>+</button>
          {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
          {
            props.tasks.map( (t) => {
              const onRemoveHandler = () => { props.removeTask(t.id)}
              const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(t.id, e.currentTarget.checked)} 
              return <li key={t.id}><input type="checkbox"
                                           onChange={onChangeHandler} 
                                           checked={t.isDone} />
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
