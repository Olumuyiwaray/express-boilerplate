import express from 'express';

const router = express.Router();

import indexRoutes from './index.routes';

router.use('/', indexRoutes);

export default router;
