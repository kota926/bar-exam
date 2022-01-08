import { Choice } from '../../entity/Choice';
import express from 'express';
import { getRepository } from 'typeorm';
const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const choiceRepository = getRepository(Choice)
        const choices = await choiceRepository.find({
            relations: ["question"],
            where: {
                subject: req.query.subject,
                unit: req.query.unit
            }
        })

        res.status(200).json(choices)
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