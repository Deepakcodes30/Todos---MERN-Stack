import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const subTodoSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: [500, "Content cannot exceed 500 characters"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    todo: {
      type: Schema.Types.ObjectId,
      ref: "Todo",
      required: true,
    },
  },
  { timestamps: true }
);

subTodoSchema.plugin(mongooseAggregatePaginate);

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);
