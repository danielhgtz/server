import { Response } from "express";
import ErrorMessage from "./errorMessage";

export const throwErrorHandler = (
  error: ErrorMessage | any,
  res: Response,
  logger?: any
) => {
  if (error instanceof ErrorMessage) {
    return res.status(error.statusCode).json({
      code: error.name,
      message: error.message,
    });
  }

  logger && logger();
  return res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
};
