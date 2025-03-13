import { CONFLICT, NOT_FOUND, OK } from "../constants/http.codes.js";
import Categories from "../models/categoryModel.js";
import HttpError from "../utils/HttpError.js";

export const categoryService = async (categoryData, userId) => {
  const { categoryName, ImageUri } = categoryData;

  if (!userId) {
    throw new HttpError("User not found", NOT_FOUND);
  }

  const categoryExist = await Categories.findOne({ categoryName });

  if (categoryExist) {
    throw new HttpError("Category already exist", CONFLICT);
  }

  const newCategory = await Categories.create({
    userId: userId,
    categoryName,
    ImageUri,
  });

  return newCategory;
};
