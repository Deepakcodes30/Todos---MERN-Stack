import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: [200, "Title cannot exceed 200 characters"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return !v || v >= new Date();
        },
        message: "Due date cannot be in the past",
      },
    },
    subTodo: [{ type: Schema.Types.ObjectId, ref: "SubTodo" }],
  },
  { timestamps: true }
);

todoSchema.plugin(mongooseAggregatePaginate);

export const Todo = mongoose.model("Todo", todoSchema);
