import React, { useState } from "react";
import AddSubTodo from "./AddSubTodo.jsx";
import SubTodo from "./SubTodo.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTodo,
  toggleCompleteStatus,
  deleteTodo,
} from "../store/todoSlice.js";

const Todo = ({ todo }) => {
  const subTodos = useSelector((state) => state.subTodo.subTodos);
  const dispatch = useDispatch();
  const [editedTitle, setEditedTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const todoSubTodos = subTodos.filter((subTodo) =>
    todo.subTodo.includes(subTodo._id)
  );

  const handleSave = () => {
    if (!editedTitle.trim()) {
      return;
    }
    dispatch(updateTodo({ todoId: todo._id, title: editedTitle }));
    setIsEditing(false);
  };

  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => dispatch(toggleCompleteStatus({ todoId: todo._id }))}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <div className={todo.isCompleted ? "line-through text-gray-400" : ""}>
            {todo.title}
          </div>
        )}

        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>edit</button>
        )}

        <button onClick={() => dispatch(deleteTodo({ todoId: todo._id }))}>
          Delete
        </button>
      </div>
      <AddSubTodo />
      <div>
        <ul>
          {todoSubTodos.map((subTodo) => {
            <li key={subTodo._id}>
              <SubTodo subTodo={subTodo} />
            </li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Todo;
