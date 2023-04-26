import React, {useState} from "react";
import "./App.css";
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

export interface TaskType {
    id: string;
    title: string;
    isDone: boolean;
}

export interface TodolistPropsInterface {
    id: string
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    filter: FilterValuesType
}

export interface TodoListType {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "Redux", isDone: true},
        {id: v1(), title: "HTML", isDone: false},
    ]);


    function removeTask(id: string) {
        let filteredTask = tasks.filter((t) => t.id !== id);
        setTasks(filteredTask);
    }

    function addTask(title: string) {
        // Объявление функции которая будет добавлять задачи
        let newTask = {id: v1(), title: title, isDone: false}; // Создание новой задачи, которуб мы позже засовываем в массив
        let newTasks = [newTask, ...tasks]; //  1. Создаем массив, и засовываем туда новую задачу, и все старые, которые были до этого.
        //   2. Деструктуризация объекта
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks]);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "active"},
        {id: todoListId2, title: "What to buy", filter: "completed"},
    ]);

    let [allTasks, setAllTasks] = useState({
        todolistId1: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "HTML", isDone: false},],
        todolistId2: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Soap", isDone: false},
            {id: v1(), title: "Coke", isDone: true},]
    })

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks;
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks.filter((t) => t.isDone === true);
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks.filter((t) => t.isDone === false);
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>

    );
}

export default App;
