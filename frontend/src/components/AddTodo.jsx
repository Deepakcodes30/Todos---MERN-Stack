import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../store/todoSlice.js";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [dueDate, setDueDate] = useState("");

  const dispatch = useDispatch();
  const inputDateRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleSubmit = () => {
    if (!title.trim()) return;

    dispatch(
      createTodo({
        title,
        dueDate: dueDate || null,
      })
    );
    setTitle("");
    setDueDate("");
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
    <div ref={wrapperRef} className="flex items-center gap-2 bg-white ">
      <input
        className={`h-10 bg-gray-100 m-2 mb-0 shadow-md rounded-md pl-2 outline-none transition-all duration-500
          ${isFocused ? "w-80" : "w-100"}`}
        type="text"
        placeholder="Add a Todo.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && (
        <>
          <button
            type="button"
            onClick={() => inputDateRef.current?.showPicker()}
            className="p-2 h-10 rounded-lg hover:bg-emerald-500 transition cursor-pointer"
            title="Pick a Due Date">
            Due
          </button>

          <input
            type="date"
            ref={inputDateRef}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="hidden"
          />

          <button
            type="button"
            className="cursor-pointer h-10 p-2 rounded-lg hover:bg-emerald-500"
            onClick={handleSubmit}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}>
            Add
          </button>
        </>
      )}
    </div>
  );
};

export default AddTodo;
