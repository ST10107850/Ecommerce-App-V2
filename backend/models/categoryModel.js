import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    ImageUri: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Categories", categorySchema);
export default Category;
