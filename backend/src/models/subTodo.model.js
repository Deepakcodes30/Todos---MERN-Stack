import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const subTodoSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

subTodoSchema.plugin(mongooseAggregatePaginate);

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);
