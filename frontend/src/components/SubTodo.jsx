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
        type="checkbox"
        checked={subTodo.isCompleted}
        onChange={() =>
          dispatch(toggleCompleteStatus({ todoId, subTodoId: subTodo._id }))
        }
      />

      {isEditing ? (
        <input
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <span
          className={subTodo.isCompleted ? "line-through text-gray-400" : ""}>
          {subTodo.content}
        </span>
      )}

      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}

      <button
        onClick={() =>
          dispatch(deleteSubTodo({ todoId, subTodoId: subTodo._id }))
        }>
        Delete
      </button>
    </div>
  );
};

export default SubTodo;
