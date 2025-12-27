import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ownershipCheck } from "../utils/ownershipCheck.js";
import { Todo } from "../models/todo.model.js";
import mongoose from "mongoose";

const getAllTodo = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortType = "desc",
    query = "",
  } = req.query;

  if (!req.user) {
    throw new apiError(400, "User not found");
  }

  //values received in query are always in string, so need to convert them into integers
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // Base condition: every user only sees their own Todos
  const match = { owner: req.user._id };

  // If searching by title
  if (query.trim() !== "") {
    match.title = { $regex: query, $options: "i" };
  }

  const todos = await Todo.find(match)
    .sort({
      [sortBy]: sortType === "asc" ? 1 : -1,
    })
    .skip(skip)
    .limit(limitNum);

  const totalTodos = await Todo.countDocuments(match);

  return res.status(200).json(
    new apiResponse(
      200,
      {
        todos,
        pagination: {
          total: totalTodos,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalTodos / limitNum),
        },
      },
      "All Todos fetched successfully"
    )
  );
});

const createTodo = asyncHandler(async (req, res) => {
  const { title, dueDate } = req.body;

  if (!title) {
    throw new apiError(400, "Please enter all details");
  }

  const todo = await Todo.create({
    title,
    dueDate,
    owner: req.user._id,
  });

  if (!todo) {
    throw new apiError(500, "Something went wrong. Please try again later");
  }

  return res
    .status(200)
    .json(new apiResponse(200, todo, "Todo created successfully"));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { title, dueDate } = req.body;
  const { todoId } = req.params;

  if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
    throw new apiError(400, "Invalid request");
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw new apiError(400, "Todo not found");
  }

  await ownershipCheck(todo.owner, req.user._id);

  todo.title = title || todo.title;
  todo.dueDate = dueDate || todo.dueDate;

  const updatedTodo = await todo.save();

  return res
    .status(200)
    .json(new apiResponse(200, updatedTodo, "Todo updated successfully"));
});

const toggleCompleteStatus = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
    throw new apiError(400, "Invalid Todo ID");
  }

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new apiError(400, "Todo not found");
  }

  await ownershipCheck(todo.owner, req.user._id);

  todo.isCompleted = !todo.isCompleted;

  const updatedTodo = await todo.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new apiResponse(200, updatedTodo, "Todo status updated successfully")
    );
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
    throw new apiError(400, "Invalid request");
  }

  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new apiError(404, "todo not found");
  }

  await ownershipCheck(todo.owner, req.user._id);

  await Todo.findByIdAndDelete(todo._id);

  return res
    .status(200)
    .json(new apiResponse(200, "Todo deleted successfully"));
});

const getTodoById = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!todoId || !mongoose.Types.ObjectId.isValid(todoId)) {
    throw new apiError(400, "Invalid request");
  }

  const todo = await Todo.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(todoId),
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
              avatar: 1,
              username: 1,
            },
          },
        ],
      },
    },

    {
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $lookup: {
        from: "subTodos",
        localField: "subTodo",
        foreignField: "_id",
        as: "subTodo",
        pipeline: [
          {
            $project: {
              content: 1,
              isCompleted: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        title: 1,
        isCompleted: 1,
        owner: 1,
        dueDate: 1,
        subTodo: 1,
      },
    },
  ]);

  if (todo.length === 0) {
    throw new apiError(400, "Todo not found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, todo[0], "Todo fetched Successfully"));
});

export {
  getAllTodo,
  createTodo,
  updateTodo,
  toggleCompleteStatus,
  deleteTodo,
  getTodoById,
};
