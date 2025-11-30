import { SubTodo } from "../models/subTodo.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ownershipCheck } from "../utils/ownershipCheck.js";
import mongoose from "mongoose";

const getAllSubTodo = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortType = "desc",
  } = req.query;

  if (!req.user) {
    throw new apiError(400, "User not found");
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const subTodo = await SubTodo.findById({ owner: req.user._id })
    .sort({
      [sortBy]: sortType === "asc" ? 1 : -1,
    })
    .skip(skip)
    .limit(limitNum);

  const totalSubTodo = await SubTodo.countDocuments({ owner: req.user._id });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        subTodo,
        pagination: {
          total: totalSubTodo,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalSubTodo / limitNum),
        },
      },
      "All SubTodos fetched successfully"
    )
  );
});

const createSubTodo = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    throw new apiError(400, "Please enter all fields");
  }
  if (!req.user) {
    throw new apiError(400, "User not found");
  }

  const subTodo = await SubTodo.create({
    content,
    owner: req.user._id,
  });

  if (!subTodo) {
    throw new apiError(400, "SubTodo not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, subTodo, "subTodo created successfully"));
});

const updateSubTodo = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { subTodoId } = req.params;

  if (!content) {
    throw new apiError(400, "Please enter all fields");
  }

  const subTodo = await SubTodo.findById(subTodoId);

  if (!subTodo) {
    throw new apiError(400, "subTodo not found");
  }

  await ownershipCheck(subTodo.owner, req.user._id);

  subTodo.content = content || subTodo.content;

  const updatedSubTodo = await subTodo.save();

  if (!updatedSubTodo) {
    throw new apiError(400, "Not found");
  }

  return res
    .status(200)
    .json(
      new apiResponse(200, updatedSubTodo, "SubTodo is updated successfully")
    );
});

const toggleCompleteStatus = asyncHandler(async (req, res) => {
  const { subTodoId } = req.params;

  if (!subTodoId || !mongoose.Types.ObjectId.isValid(subTodoId)) {
    throw new apiError(400, "SubTodo is not found");
  }

  const subTodo = await SubTodo.findById(subTodoId);

  if (!subTodo) {
    throw new apiError(400, "SubTodo not found");
  }

  await ownershipCheck(subTodo.owner, req.user._id);

  subTodo.isCompleted = !subTodo.isCompleted;
  const updatedSubTodo = await subTodo.save();

  return res
    .status(200)
    .json(new apiResponse(200, updatedSubTodo, "SubTodo updated SuccessFully"));
});

const deleteSubTodo = asyncHandler(async (req, res) => {
  const { subTodoId } = req.params;

  if (!subTodoId || !mongoose.Types.ObjectId.isValid(subTodoId)) {
    throw new apiError(400, "SubTodo is not found");
  }

  const subTodo = await SubTodo.findById(subTodoId);

  if (!subTodo) {
    throw new apiError(400, "SubTodo not found");
  }

  await ownershipCheck(subTodo.owner, req.user._id);

  await SubTodo.findByIdAndDelete(subTodo._id);

  return res
    .status(200)
    .json(new apiResponse(200, "SubTodo was deleted successfully"));
});

const getSubTodoById = asyncHandler(async (req, res) => {
  const { subTodoId } = req.params;

  if (!subTodoId || !mongoose.Types.ObjectId.isValid(subTodoId)) {
    throw new apiError(400, "Invalid subTodo Id");
  }

  const subTodo = await SubTodo.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(subTodoId),
        owner: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              fullName: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },

    {
      $addFields: {
        owner: { $first: "$owner" },
      },
    },
    {
      $project: {
        content: 1,
        isCompleted: 1,
        owner: 1,
      },
    },
  ]);

  if (subTodo.length === 0) {
    throw new apiError(400, "SubTodo not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, subTodo[0], "SubTodo fetched successfully"));
});

export {
  getAllSubTodo,
  createSubTodo,
  updateSubTodo,
  toggleCompleteStatus,
  deleteSubTodo,
};
