import { Request, Response, NextFunction } from "express";
import { logger } from "@/infra/logging/logger";
import { HttpError } from "@/shared/errors/HttpError";

function isPostgresConnectionError(error: any): boolean {
  if (!error) return false;

  const networkErrors = ["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT"];

  const postgresErrorCodes = ["57P01", "28P01", "08006", "08001", "08004"];

  return (
    networkErrors.includes(error.code) ||
    (typeof error.code === "string" && postgresErrorCodes.includes(error.code))
  );
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    logger.error(err.message, { err });
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
    return;
  }

  if (isPostgresConnectionError(err)) {
    logger.error("Postgres connection error", { err });
    res.status(503).json({
      success: false,
      message: "Internal Server Error",
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
    return;
  }

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  logger.error("Unhandled application error", {
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
    method: req.method,
    url: req.originalUrl,
    params: req.params,
    query: req.query,
    body: req.body,
  });

  res.status(status).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    },
  });
}
