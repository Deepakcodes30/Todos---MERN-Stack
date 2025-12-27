import React, { useEffect } from "react";
import TodosContainer from "../components/TodosContainer.jsx";
import { getAllTodo } from "../store/todoSlice.js";
import AddTodo from "../components/AddTodo";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(getAllTodo());
    }
  }, [dispatch, user]);
  return (
    <div>
      <AddTodo />
      <TodosContainer />
    </div>
  );
}

export default Home;
