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

export const updateCategoryService = async (categoryId, categoryData) => {
  const { categoryName, ImageUri } = categoryData;

  if (!categoryId) {
    throw new HttpError("Category not found", NOT_FOUND);
  }

  const category = await Categories.findById(categoryId);

  if (!category) {
    throw new HttpError("Category not found", NOT_FOUND);
  }

  category.categoryName = categoryName || category.categoryName;
  category.ImageUri = ImageUri || category.ImageUri;
  category.userId = category.userId || category.userId;

  await category.save();

  return category;
};

export const deleteCategoryService = async (categoryId) => {
  if (!categoryId) {
    throw new HttpError("Category not found", NOT_FOUND);
  }

  const category = await Categories.findById(categoryId);

  if (!category) {
    throw new HttpError("Category not found", NOT_FOUND);
  }

  await category.deleteOne({ _id: categoryId });

  return { message: "Category deleted successfully" };
};
