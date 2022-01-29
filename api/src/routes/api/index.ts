import express from 'express';
import sampleRouter from './sample';
import choiceRouter from './choice';
import questionRouter from './question'

const router = express.Router();

router.use('/sample', sampleRouter);
router.use('/choice', choiceRouter);
router.use('/question', questionRouter);

export default router;