import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Typography from "@mui/material/Typography";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";
const isDevelopmentRun =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

function App() {
  const [todos, setTodos] = useState([]);
  const isMountedRef = useRef(!isDevelopmentRun);

  // fires when app component mounts to the DOM
  // !!! since React v18 this useEffect function is run twice on mount in dev mode
  // --> therefore we need a little workaround for dev mode to make sure the code is executed only once
  useEffect(() => {
    if (!isMountedRef.current) {
      const storedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedItems) {
        setTodos(storedItems);
      }
      isMountedRef.current = true;
      console.log("Hello from useEffect in " + process.env.NODE_ENV);
      console.log(storedItems);
    }
  }, []);

  // fires when todos array gets updated
  useEffect(() => {
    console.log("todos changed:");
    console.log(todos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // adds new todo to beginning of todos array
  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <Typography style={{ padding: 16 }} variant="h1">
        React Todo
      </Typography>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
      />
    </div>
  );
}

export default App;
