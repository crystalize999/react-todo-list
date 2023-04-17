import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export interface TodolistPropsInterface {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
}

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "Redux", isDone: true },
    { id: v1(), title: "HTML", isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("completed");

  function removeTask(id: string) {
    let filteredTask = tasks.filter((t) => t.id !== id);
    setTasks(filteredTask);
  }

  function addTask(title: string) {
    // Объявление функции которая будет добавлять задачи
    let newTask = { id: v1(), title: title, isDone: false }; // Создание новой задачи, которуб мы позже засовываем в массив
    let newTasks = [newTask, ...tasks]; //  1. Создаем массив, и засовываем туда новую задачу, и все старые, которые были до этого.
    //   2. Деструктуризация объекта
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <Todolist
        title="Study"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
