import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo.jsx";
import { getAllTodo } from "../store/todoSlice.js";

const TodosContainer = () => {
  const todos = useSelector((state) => {
    console.log("REDUX TODOS 👉", state.todo.todos);
    state.todo.todos;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodo({ page: 1 }));
  }, [dispatch]);

  return (
    <div>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo._id}>
              <Todo todo={todo} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodosContainer;
