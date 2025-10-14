export class HttpError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}
