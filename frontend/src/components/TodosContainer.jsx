import { useSelector } from "react-redux";
import Todo from "./Todo.jsx";

const TodosContainer = () => {
  const todos = useSelector((state) => state.todo.todos);

  // console.log("todos fetched", todos);

  if (!todos || todos.length === 0) {
    return <p>No todos found</p>;
  }

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
