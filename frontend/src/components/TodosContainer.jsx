import React from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo.jsx";

const TodosContainer = ({ todo }) => {
  const todos = useSelector((state) => state.todo.todos);

  return (
    <div>
      <ul>
        {todos.map((todo) => {
          <li key={todo._id}>
            <Todo todo={todo} />
          </li>;
        })}
      </ul>
    </div>
  );
};

export default TodosContainer;
