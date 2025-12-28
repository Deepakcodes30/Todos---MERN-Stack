import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

/*import rateLimit from "express-rate-limit";

// General rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

// Strict limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: "Too many authentication attempts, please try again later",
});

app.use("/api/", limiter);
app.use("/api/v1/users/login", authLimiter);
app.use("/api/v1/users/register", authLimiter); */

export { app };
