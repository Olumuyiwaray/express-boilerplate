import { getEnvVariable } from '../lib/utils';
import rateLimit from 'express-rate-limit';
/**
 * Define enviromental variable configuration,
 * set up database connections amongst other things
 */

export const enviromentConfig = {
  port: parseInt(getEnvVariable('PORT'), 10) || 3000,
};

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests please try again later',
});
