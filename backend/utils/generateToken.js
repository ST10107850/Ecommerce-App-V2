import jwt from "jsonwebtoken";
import { AFTER_30_DAYS } from "../constants/date.const.js";
import { NODE_ENV } from "../constants/env.const.js";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    someSite: "strict",
    maxAge: AFTER_30_DAYS(),
  });
};
