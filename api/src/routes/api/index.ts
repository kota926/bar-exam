import express from 'express';
import sampleRouter from './sample';
import choiceRouter from './choice'

const router = express.Router();

router.use('/sample', sampleRouter);
router.use('/choice', choiceRouter)

export default router;