import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http.codes.js";
import HttpError from "../utils/HttpError.js";
import { ZodError } from "zod";
import { NODE_ENV } from "../constants/env.const.js";

export const notFound = (req, res, next) => {
  const error = new HttpError(`Not Found - ${req.originalUrl}`, NOT_FOUND);
  next(error);
};

const handleZodError = (err) => {
  const error = err.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
  return {
    statusCode: BAD_REQUEST,
    body: {
      error,
      message: "Validation Error",
    },
  };
};
export const errorHandle = (err, req, res, next) => {
  console.error("Error", err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      stack: NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  if (err instanceof ZodError) {
    const { statusCode, body } = handleZodError(err);
    return res.status(statusCode).json(body);
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    stack: NODE_ENV === "development" ? err.stack : undefined,
  });
};
