import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//accepting json directly using express
app.use(express.json({ limit: "16kb" }));

//accepting data from URL where the urlencodd converts and encods URL
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//accepting files and data
app.use(express.static("public"));

//setting up cookieparser
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";
import subTodoRouter from "./routes/subTodo.route.js";

//routes declaration - this is basically fixed route that when client goes on users the route is activated and then further routing will working from /users
//routes will pass the control further - basically prefix for users route
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/subTodo", subTodoRouter);

export { app };
