import express from 'express';
import authRouter from './auth/index'
import apiRouter from './api/index'

const router = express.Router();
router.use('/auth', authRouter)
router.use('/api', apiRouter)

export default router