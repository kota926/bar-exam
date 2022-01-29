import { Question } from '../../entity/Question';
import express from 'express';
import { getRepository } from 'typeorm';
const router = express.Router()

router.get('/', async (_: express.Request, res: express.Response) => {
    try {
        const questionRepository = getRepository(Question)
        const questions = await questionRepository
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.choices', 'choice')
            .where('choice.subject = :subject', {subject: "憲法"})
            .andWhere('choice.unit = :unit', {unit: 11})
            .getMany()

        res.status(200).json(questions)
    } catch(error: any) {
        res.status(400).json({message: error.message});
    }
});

router.post('/', (_: express.Request, res: express.Response) => {
    try {
        res.status(200).json({ message: "登録しました"});
    } catch(error: any) {
        res.status(400).json({message: error.message});
    }
});

export default router;