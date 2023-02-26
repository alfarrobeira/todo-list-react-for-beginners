import React from "react";
import Todo from "./Todo";
import { List } from "@mui/material";

function TodoList({ todos, toggleComplete, removeTodo }) {
  return (
    <List>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
        />
      ))}
    </List>
  );
}

export default TodoList;
