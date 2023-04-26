import React, {ChangeEvent, KeyboardEvent} from "react";
import {TodolistPropsInterface} from "./App";
import {useState} from "react";


export function Todolist(props: TodolistPropsInterface) {

    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTaskTitle.trim() === "") {
            setError("Fill in the input fields");
            return;
        }
        if (e.code === "Enter") {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("")
        }
    }
    const addNewTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Fill in the input fields")
            return;
        } else {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("")
        }

    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolist  = () => {
        props.removeTodolist(props.id);
    }


    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>X</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addNewTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                           onChange={onChangeHandler}
                                                                                           checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;
