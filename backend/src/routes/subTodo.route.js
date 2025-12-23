import { Router } from "express";

import {
  getAllSubTodo,
  createSubTodo,
  updateSubTodo,
  toggleCompleteStatus,
  deleteSubTodo,
  getSubTodoById,
} from "../controllers/subTodo.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/:todoId/get-all-subTodo").get(getAllSubTodo);
router.route("/:todoId/create-subTodo").post(createSubTodo);
router.route("/:todoId/:subTodoId/update-subTodo").patch(updateSubTodo);
router
  .route("/:todoId/:subTodoId/toggle-complete-status")
  .patch(toggleCompleteStatus);
router.route("/:todoId/:subTodoId/delete-subTodo").delete(deleteSubTodo);
router.route("/:todoId/:subTodoId/get-current-subTodo").get(getSubTodoById);

export default router;
