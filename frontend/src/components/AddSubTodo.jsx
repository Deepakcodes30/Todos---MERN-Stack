import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSubTodo } from "../store/subTodoSlice.js";

const AddSubTodo = () => {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const handleSubmit = () => {
    if (!title.trim()) return;

    dispatch(
      createSubTodo({
        content,
      })
    );
    setContent("");
    setIsFocused(false);
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
        value={title}
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
