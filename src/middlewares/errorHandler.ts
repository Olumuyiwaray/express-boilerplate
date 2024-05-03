import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';

const errorHandlingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error
  logger.error(
    `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  // Hide sensitive error details in production
  const errorResponse =
    process.env.NODE_ENV === 'development'
      ? { error: message, stack: err.stack }
      : { error: 'Internal Server Error' };

  // Send error response to the client
  res.status(statusCode).json(errorResponse);
};

export default errorHandlingMiddleware;
