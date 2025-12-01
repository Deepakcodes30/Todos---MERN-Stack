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
router.route("/update-todo").patch(updateTodo);
router.route("/toggle-complete-status").patch(toggleCompleteStatus);
router.route("/delete-todo").delete(deleteTodo);
router.route("/get-current-todo").get(getTodoById);

export default router;
