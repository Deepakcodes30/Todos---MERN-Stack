import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSubTodo, getAllSubTodo } from "../store/subTodoSlice.js";

const AddSubTodo = ({ todoId }) => {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      await dispatch(
        createSubTodo({
          todoId,
          content,
        })
      ).unwrap();

      dispatch(getAllSubTodo({ todoId, page: 1, limit: 50 }));

      setContent("");
      setIsFocused(false);
    } catch (error) {
      alert(`Failed to create subtodo: ${error}`);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={wrapperRef}>
      <input
        type="text"
        placeholder="Add a SubTodo.."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && (
        <>
          <button
            type="button"
            onClick={handleSubmit}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}>
            Add
          </button>
        </>
      )}
    </div>
  );
};

export default AddSubTodo;
