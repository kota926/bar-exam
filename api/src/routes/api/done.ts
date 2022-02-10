import { Constitution } from '../../entity/Constitution';
import { Government } from '../../entity/Government';
import express from 'express';
import { getRepository } from 'typeorm';
const router = express.Router()

// interface User {
//     id: string
//     name: string;
//     email: string;
//     password: string;
//     lastQuestion: string
//     constitutionId: number
//     constitution: Constitution;
//     governmentId: number
//     createdAt: string;
//     updatedAt: string;
// }

// interface ExRequest extends Request {
//     query: {
//         subject: string
//         user: User
//     }
// }

router.get('/', async (req: express.Request, res: express.Response) => {
    
    try {
        switch(req.query.subject) {
            case 'cons': {
                const consRepository = getRepository(Constitution)
                const record = await consRepository.find({
                    where: {
                        id: req.query.id
                    }
                }).catch((err) => {
                    console.log(err)
                    res.status(400).json({message: err.message})
                })
                console.log(record)
                res.status(200).json(record)
                break;
            }
            case 'gov': {
                const govRepository = getRepository(Government)
                const record = await govRepository.find({
                    where: {
                        id: req.query.id
                    }
                }).catch((err) => {
                    console.log(err)
                    res.status(400).json({message: err.message})
                })
                console.log(record)
                res.status(200).json(record)
                break;
            }
            default:
                res.json({message: 'subject not found'})
        }
        // const choiceRepository = getRepository(Choice)
        // const choices = await choiceRepository.find({
        //     relations: ["question"],
        //     where: {
        //         subject: req.query.subject,
        //         unit: req.query.unit
        //     }
        // })

        // res.status(200).json(choices)
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