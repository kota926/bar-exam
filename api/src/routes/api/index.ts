import express from 'express';
import sampleRouter from './sample';
import choiceRouter from './choice';
import questionRouter from './question';
import doneRouter from './done'

const router = express.Router();

router.use('/sample', sampleRouter);
router.use('/choice', choiceRouter);
router.use('/question', questionRouter);
router.use('/done', doneRouter)

export default router;