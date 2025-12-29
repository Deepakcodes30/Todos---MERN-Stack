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

  const todoSubTodos = subTodos.filter((subTodo) => subTodo.todo === todo._id);

  const handleSave = () => {
    if (!editedTitle.trim()) {
      return;
    }
    dispatch(updateTodo({ todoId: todo._id, title: editedTitle }));
    setIsEditing(false);
  };

  return (
    <div className="bg-red-100 m-2 p-2 rounded-xl shadow-md">
      <div className="flex gap-2 items-center align-middle">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => dispatch(toggleCompleteStatus(todo._id))}
        />
        {isEditing ? (
          <input
            className="w-70 border shadow-md my-2 bg-blue-50 rounded-lg pl-2 py-1 transition-all duration-300"
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <div
            className={`text-lg ${todo.dueDate ? "w-48" : "w-68"} ${
              todo.isCompleted ? "line-through text-gray-400" : ""
            }`}>
            {todo.title}
          </div>
        )}

        {/* Due date */}
        {todo.dueDate && !isEditing && (
          <span
            className={`text-sm whitespace-nowrap ${
              new Date(todo.dueDate) < new Date() && !todo.isCompleted
                ? "text-red-500 font-semibold"
                : "text-gray-500"
            }`}>
            {new Date(todo.dueDate).toLocaleDateString()}
          </span>
        )}

        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(true);
              setEditedTitle(todo.title);
            }}>
            edit
          </button>
        )}

        <button onClick={() => dispatch(deleteTodo(todo._id))}>Delete</button>
      </div>
      <AddSubTodo todoId={todo._id} />
      <div
        className={`bg-red-300 rounded-lg ${
          todoSubTodos.length > 0 ? "p-2" : "p-0"
        }`}>
        <ul>
          {todoSubTodos.map((subTodo) => {
            return (
              <li key={subTodo._id}>
                <SubTodo subTodo={subTodo} todoId={todo._id} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
