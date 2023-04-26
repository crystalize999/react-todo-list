import React, {useState} from "react";
import "./App.css";
import todolist, {Todolist} from "./Todolist";
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
    removeTask: (id: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void;
}

export interface TodoListType {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTask = tasks.filter((t) => t.id !== id);
        tasksObj[todolistId] = filteredTask
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        // Объявление функции которая будет добавлять задачи
        let newTask = {id: v1(), title: title, isDone: false}; // Создание новой задачи, которуб мы позже засовываем в массив
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks]; //  1. Создаем массив, и засовываем туда новую задачу, и все старые, которые были до этого.
        tasksObj[todolistId] = newTasks
        //   2. Деструктуризация объекта
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj});
        }

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

    let removeTodolist = (todoListId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todoListId)
        setTodolists(filteredTodolist)
        delete tasksObj[todoListId];
        setTasks({...tasksObj});
    }

    let [tasksObj, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "HTML", isDone: false},],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Soap", isDone: false},
            {id: v1(), title: "Coke", isDone: true},]
    })

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
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
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>

    );
}

export default App;
