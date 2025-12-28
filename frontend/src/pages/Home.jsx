import React, { useEffect } from "react";
import TodosContainer from "../components/TodosContainer.jsx";
import { getAllTodo } from "../store/todoSlice.js";
import { getAllSubTodo } from "../store/subTodoSlice.js";
import AddTodo from "../components/AddTodo";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const todos = useSelector((state) => state.todo.todos);

  useEffect(() => {
    if (user) {
      dispatch(getAllTodo({ page: 1 }));
    }
  }, [dispatch, user]);

  //Fetch subtodos whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      todos.forEach((todo) => {
        dispatch(getAllSubTodo({ todoId: todo._id, page: 1, limit: 50 }));
      });
    }
  }, [dispatch, todos]);

  return (
    <div>
      <AddTodo />
      <TodosContainer />
    </div>
  );
}

export default Home;
