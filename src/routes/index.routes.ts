import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Index route');
});

router.get('/error', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('an error occurred');
  next(error);
});

export default router;
