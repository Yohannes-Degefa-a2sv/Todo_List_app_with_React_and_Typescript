import "./styles.css";
import React, { useState } from "react";

interface Task {
  text: string;
  edit: boolean;
}

export default function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  const addTaskHandler = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, edit: false }]);
      setTask(""); // Clear the input after adding the task
    }
  };

  const editTaskHandler = (index: number) => {
    const newTasks = tasks.map((t, i) => {
      if (i === index) {
        return { ...t, edit: !t.edit };
      }
      return t;
    });
    setTasks(newTasks);
  };

  const deleteTaskHandler = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTaskTextHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newTasks = tasks.map((t, i) => {
      if (i === index) {
        return { ...t, text: event.target.value };
      }
      return t;
    });
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          value={task}
          onChange={inputChangeHandler}
          placeholder="Enter your task..."
        />
        <button className="add-button" onClick={addTaskHandler}>
          +
        </button>
      </div>
      <div className="todos-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-container todo">
            {task.edit ? (
              <input
                type="text"
                value={task.text}
                onChange={(e) => updateTaskTextHandler(e, index)}
                className="todo-input"
              />
            ) : (
              <label>
                <input type="checkbox" />
                <span>{task.text}</span>
              </label>
            )}
            <div>
              <button
                className="edit-btn"
                onClick={() => editTaskHandler(index)}
              >
                ✎
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTaskHandler(index)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
