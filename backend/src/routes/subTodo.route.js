import { Router } from "express";

import {
  getAllSubTodo,
  createSubTodo,
  updateSubTodo,
  toggleCompleteStatus,
  deleteSubTodo,
} from "../controllers/subTodo.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/get-all-subTodo").get(getAllSubTodo);
router.route("/create-subTodo").post(createSubTodo);
router.route("/update-subTodo").patch(updateSubTodo);
router.route("/toggle-complete-status").patch(toggleCompleteStatus);
router.route("delete-subTodo").delete(deleteSubTodo);

export default router;
