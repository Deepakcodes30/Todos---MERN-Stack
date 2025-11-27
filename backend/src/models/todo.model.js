import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const todoSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    subTodos: [{ type: Schema.Types.ObjectId, ref: "SubTodo" }],
  },
  { timestamps: true }
);

todoSchema.plugin(mongooseAggregatePaginate);

export const Todo = mongoose.model("Todo", todoSchema);
