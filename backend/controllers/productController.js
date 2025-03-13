import expressAsyncHandler from "express-async-handler";
import { CREATED, OK } from "../constants/http.codes.js";
import {
  createProductService,
  getProductByCategory,
  // updateProductService,
} from "../services/productService.js";
import Product from "../models/productModel.js";
import { deleteOneDoc, getAllDoc, getOneDoc, updateDoc } from "../services/crudHandlerFactory.js";

export const createProduct = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const product = await createProductService(req.body, req.user._id);

  res
    .status(CREATED)
    .json({ success: true, message: "Product created", data: product });
});
export const getCategoryProduct = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const products = await getProductByCategory(categoryId);

  res
    .status(OK)
    .json({ success: true, message: "Product found", data: products });
});
export const getAllProduct = getAllDoc(Product);

export const updatedProduct = updateDoc(Product)

export const getProductDetails = getOneDoc(Product);

export const deleteProduct = deleteOneDoc(Product);
