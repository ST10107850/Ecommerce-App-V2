import expressAsyncHandler from "express-async-handler";
import { categoryService } from "../services/categoryService.js";
import { CREATED, OK } from "../constants/http.codes.js";
import Category from "../models/categoryModel.js";
import {
  deleteOneDoc,
  getAllDoc,
  updateDoc,
} from "../services/crudHandlerFactory.js";

export const createCategory = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const category = await categoryService(req.body, userId);

  res.status(CREATED).json({
    successs: true,
    message: "Category created successfully",
    data: category,
  });
});

export const updateCategory = updateDoc(Category);

export const getAllCategories = getAllDoc(Category);

export const deleteCategory = deleteOneDoc(Category);
