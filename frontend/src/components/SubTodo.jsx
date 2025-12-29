import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateSubTodo,
  toggleCompleteStatus,
  deleteSubTodo,
} from "../store/subTodoSlice";

const SubTodo = ({ subTodo, todoId }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(subTodo?.content || "");

  const handleSave = () => {
    if (!editedContent.trim()) return;
    dispatch(
      updateSubTodo({ todoId, subTodoId: subTodo._id, content: editedContent })
    );
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        className=""
        type="checkbox"
        checked={subTodo.isCompleted}
        onChange={() =>
          dispatch(toggleCompleteStatus({ todoId, subTodoId: subTodo._id }))
        }
      />

      {isEditing ? (
        <input
          className="w-60 border shadow-md bg-blue-50 rounded-lg transition-all duration-300 pl-2 px-2"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <span
          className={`w-65 ${
            subTodo.isCompleted ? "line-through text-gray-400" : ""
          }`}>
          {subTodo.content}
        </span>
      )}

      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>edit</button>
      )}

      <button
        onClick={() =>
          dispatch(deleteSubTodo({ todoId, subTodoId: subTodo._id }))
        }>
        delete
      </button>
    </div>
  );
};

export default SubTodo;
