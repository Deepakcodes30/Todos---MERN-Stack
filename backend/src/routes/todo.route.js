import { Router } from "express";

import {
  getAllTodo,
  createTodo,
  updateTodo,
  toggleCompleteStatus,
  deleteTodo,
  getTodoById,
} from "../controllers/todo.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/get-all-todo").get(getAllTodo);
router.route("/create-todo").post(createTodo);
router.route("/update-todo/:todoId").patch(updateTodo);
router.route("/toggle-complete-status/:todoId").patch(toggleCompleteStatus);
router.route("/delete-todo/:todoId").delete(deleteTodo);
router.route("/get-current-todo/:todoId").get(getTodoById);

export default router;
