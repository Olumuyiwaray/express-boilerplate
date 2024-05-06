/* eslint-disable @typescript-eslint/no-unsafe-call */
import dotenv from 'dotenv';

dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes/routes';
import methodOverride from 'method-override';
import hpp from 'hpp';
import mongoSanitze from 'express-mongo-sanitize';
import loggerMiddleware from './middlewares/loggerMiddleware';
import errorHandlingMiddleware from './middlewares/errorHandler';
import { enviromentConfig, limiter } from './config/config';

const app: Application = express();

const port = enviromentConfig.port;

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(methodOverride('_method'));
app.use(hpp());
app.use(mongoSanitze());
app.use(compression());

// -------- import logging middleware -------- //
app.use(loggerMiddleware);

// ------- register routes ------- //
app.use(routes);

// -------- handle 404 errors --------- //
app.use((req: Request, res: Response) => {
  const err = new Error(`path ${req.originalUrl} not found`);
  res.status(404).json({ message: err.message });
});

// -------- import error handling middleware -------- //
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
