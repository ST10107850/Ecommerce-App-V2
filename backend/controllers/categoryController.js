import expressAsyncHandler from "express-async-handler";
import {
  categoryService,
  deleteCategoryService,
  updateCategoryService,
} from "../services/categoryService.js";
import { CREATED, OK } from "../constants/http.codes.js";
import Category from "../models/categoryModel.js";
import { getAllDoc } from "../services/crudHandlerFactory.js";

export const createCategory = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const category = await categoryService(req.body, userId);

  res.status(CREATED).json({
    successs: true,
    message: "Category created successfully",
    data: category,
  });
});

export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await updateCategoryService(id, req.body);

  res.status(OK).json({
    successs: true,
    message: "Category updated successfully",
    data: category,
  });
});

export const getAllCategories = getAllDoc(Category);

export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await deleteCategoryService(id);

  res.status(OK).json({
    successs: true,
    data: category,
  });
});
