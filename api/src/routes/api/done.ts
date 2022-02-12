import { Constitution } from '../../entity/Constitution';
import { Government } from '../../entity/Government';
import { Civil } from '../../entity/Civil'
import { Company } from '../../entity/Company'
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
            case 'civil': {
                const civilRepository = getRepository(Civil)
                const record = await civilRepository.find({
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
            case 'company': {
                const companyRepository = getRepository(Company)
                const record = await companyRepository.find({
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

router.post('/', (req: express.Request, res: express.Response) => {
    console.log(req.body)
    let unit:string
    if(typeof req.body.unit === 'string' ) {
        unit = req.body.unit
    }
    try {
        console.log(req.body.subject)
        switch(req.body.subject) {
            case 'cons': {
                const consRepository = getRepository(Constitution)
                consRepository.findOne({
                    where: {
                        id: req.body.id
                    }
                }).then(async (record: Constitution) => {
                    console.log(record)
                    consRepository.merge(record, { [unit] : req.body.index})
                    const results = await consRepository.save(record)
                    console.log(results)
                    res.status(200).json(results)
                }).catch((err) => {
                    console.log(err)
                    res.status(400).json({message: err.message})
                })
                break;
            }
            case 'gov': {
                const govRepository = getRepository(Government)
                govRepository.findOne({
                    where: {
                        id: req.body.id
                    }
                }).then(async (record: Government) => {
                    console.log(record)
                    govRepository.merge(record, { [unit] : req.body.index})
                    const results = await govRepository.save(record)
                    console.log(results)
                    res.status(200).json(results)
                }).catch((err) => {
                    console.log(err)
                    res.status(400).json({message: err.message})
                })
                break;
            }
            case 'civil': {
                const civilRepository = getRepository(Civil)
                civilRepository.findOne({
                    where: {
                        id: req.body.id
                    }
                }).then(async (record: Civil) => {
                    civilRepository.merge(record, { [unit] : req.body.index})
                    const results = await civilRepository.save(record)
                    console.log(results)
                    res.status(200).json(results)
                }).catch((err) => {
                    console.log(err)
                    res.status(400).json({message: err.message})
                })
                break;
            }
            case 'company': {
                const companyRepository = getRepository(Company)
                companyRepository.findOne({
                    where: {
                        id: req.body.id
                    }
                }).then(async (record: Company) => {
                    companyRepository.merge(record, { [unit] : req.body.index})
                    const results = await companyRepository.save(record)
                    console.log(results)
                    res.status(200).json(results)
                }).catch((err) => {
                    console.log(err)
                    res.status(400).json({message: err.message})
                })
                break;
            }
            default:
                res.json({message: 'subject not found'})
        }
    } catch(error: any) {
        res.status(400).json({message: error.message});
    }
});

export default router;