import expressAsyncHandler from "express-async-handler";
import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import HttpError from "../utils/HttpError.js";
import { UNAUTHORIZED } from "../constants/http.codes.js";
import { JWT_SECRET } from "../constants/env.const.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new HttpError("Not authorized, no token", UNAUTHORIZED));
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await Users.findById(decoded.userId);

  if (!user) {
    console.log("User not found for decoded ID:", decoded.userId);
    return next(new HttpError("User not found", UNAUTHORIZED));
  }

  req.user = user;
  next();
});
