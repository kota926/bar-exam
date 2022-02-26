import { Constitution } from '../../entity/Constitution';
import { Government } from '../../entity/Government';
import { Civil } from '../../entity/Civil'
import { Company } from '../../entity/Company'
import { User } from '../../entity/User'
import express from 'express';
import { getRepository } from 'typeorm';
import jwt, { JwtPayload } from 'jsonwebtoken'

const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    const bearToken = req.headers['authorization']
    if(bearToken) {
        const bearer = bearToken.split(' ')
        const token = bearer[1]

        jwt.verify(token, 'lawapp', async (err, _: JwtPayload)=>{
            if(err) {
                return res.sendStatus(403)
            }
            try {
                switch(req.query.subject) {
                    case 'cons': {
                        const consRepository = getRepository(Constitution)
                        const record = await consRepository.findOne({
                            where: {
                                id: req.query.id
                            }
                        }).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        res.status(200).json(record)
                        break;
                    }
                    case 'gov': {
                        const govRepository = getRepository(Government)
                        const record = await govRepository.findOne({
                            where: {
                                id: req.query.id
                            }
                        }).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        res.status(200).json(record)
                        break;
                    }
                    case 'civil': {
                        const civilRepository = getRepository(Civil)
                        const record = await civilRepository.findOne({
                            where: {
                                id: req.query.id
                            }
                        }).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        res.status(200).json(record)
                        break;
                    }
                    case 'company': {
                        const companyRepository = getRepository(Company)
                        const record = await companyRepository.findOne({
                            where: {
                                id: req.query.id
                            }
                        }).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        res.status(200).json(record)
                        break;
                    }
                    default:
                        res.json({message: 'subject not found'})
                }
            } catch(error: any) {
                res.status(400).json({message: error.message});
            }
        })
    } else {
        res.json({message: 'error happend'})
    }
});

router.put('/:recordId', async (req: express.Request, res: express.Response) => {
    const bearToken = req.headers['authorization']
    let unit:string
    if(typeof req.body.unit === 'string' ) {
        unit = req.body.unit
    }
    if(bearToken) {
        const bearer = bearToken.split(' ')
        const token = bearer[1]

        jwt.verify(token, 'lawapp', async (err, user: JwtPayload)=>{
            if(err) {
                return res.sendStatus(403)
            }
            try {
                const userRepository = getRepository(User)
                const userToUpdate = await userRepository.findOne(user.id)
                if(userToUpdate) {
                    userToUpdate.lastSubject = req.body.subject
                    userToUpdate.lastUnit = req.body.unit
                    userToUpdate.lastNumber = req.body.lastNum
                    await userRepository.save(userToUpdate)
                }
                switch(req.body.subject) {
                    case 'cons': {
                        const consRepository = getRepository(Constitution)
                        consRepository.findOne(req.params.recordId)
                        .then(async (record: Constitution) => {
                            consRepository.merge(record, { [unit] : req.body.index})
                            const results = await consRepository.save(record)
                            res.status(200).json(results)
                        }).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        break;
                    }
                    case 'gov': {
                        const govRepository = getRepository(Government)
                        govRepository.findOne(req.params.recordId)
                        .then(async (record: Government) => {
                            govRepository.merge(record, { [unit] : req.body.index})
                            const results = await govRepository.save(record)
                            res.status(200).json(results)
                        }).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        break;
                    }
                    case 'civil': {
                        const civilRepository = getRepository(Civil)
                        civilRepository.findOne(req.params.recordId)
                        .then(async (record: Civil) => {
                            civilRepository.merge(record, { [unit] : req.body.index})
                            const results = await civilRepository.save(record)
                            res.status(200).json(results)
                        }).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        break;
                    }
                    case 'company': {
                        const companyRepository = getRepository(Company)
                        companyRepository.findOne(req.params.recordId)
                        .then(async (record: Company) => {
                            companyRepository.merge(record, { [unit] : req.body.index})
                            const results = await companyRepository.save(record)
                            res.status(200).json(results)
                        }).catch((err) => {
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
            
        })
    } else {
        res.json({message: 'error happend'})
    }
});

router.put('/', (req: express.Request, res: express.Response) => {
    // 誤った削除を防止
    if(req.body.isDelete) {
        const bearToken = req.headers['authorization']
        if(bearToken) {
            const bearer = bearToken.split(' ')
            const token = bearer[1]

            jwt.verify(token, 'lawapp', async (err, user: JwtPayload)=>{
                if(err) {
                    return res.sendStatus(403)
                }
                try {
                    const userRepository = getRepository(User)
                    const userToUpdate = await userRepository.findOne(user.id)
                    if(userToUpdate) {
                        userToUpdate.lastSubject = "cons"
                        userToUpdate.lastUnit = "1"
                        userToUpdate.lastNumber = 0
                        await userRepository.save(userToUpdate)
                    
                        const consRepository = getRepository(Constitution)
                        const consRecord = await consRepository.findOne(userToUpdate.constitutionId).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        if(consRecord) {
                            consRepository.merge(consRecord, {
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0,
                                13: 0,
                                14: 0,
                                15: 0,
                                16: 0,
                                17: 0,
                                18: 0,
                                19: 0,
                                20: 0,
                                21: 0,
                                22: 0,
                                23: 0,
                                24: 0,
                            })
                            await consRepository.save(consRecord)
                        }

                        const govRepository = getRepository(Government)
                        const govRecord = await govRepository.findOne(userToUpdate.governmentId).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        if(govRecord) {
                            govRepository.merge(govRecord, {
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0,
                                13: 0,
                                14: 0,
                                15: 0,
                                16: 0,
                                17: 0,
                                18: 0,
                                19: 0,
                                20: 0,
                                21: 0,
                                22: 0,
                            })
                            await govRepository.save(govRecord)
                        }

                        const civilRepository = getRepository(Civil)
                        const civilRecord = await civilRepository.findOne(userToUpdate.civilId).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        if(civilRecord) {
                            civilRepository.merge(civilRecord, {
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0,
                                13: 0,
                                14: 0,
                                15: 0,
                                16: 0,
                                17: 0,
                                18: 0,
                                19: 0,
                                20: 0,
                                21: 0,
                                22: 0,
                                23: 0,
                                24: 0,
                                25: 0,
                                26: 0,
                                27: 0,
                                28: 0,
                                29: 0,
                                30: 0,
                                31: 0,
                                32: 0,
                                33: 0,
                                34: 0,
                                35: 0,
                                36: 0,
                                37: 0,
                                38: 0,
                                39: 0,
                                40: 0,
                                41: 0,
                                42: 0,
                                43: 0,
                                44: 0,
                                45: 0,
                                46: 0,
                                47: 0,
                                48: 0,
                                49: 0,
                                50: 0,
                                51: 0,
                            })
                            await civilRepository.save(civilRecord)
                        }

                        const companyRepository = getRepository(Company)
                        const companyRecord = await companyRepository.findOne(userToUpdate.companyId).catch((err) => {
                            res.status(400).json({message: err.message})
                        })
                        if(companyRecord) {
                            companyRepository.merge(companyRecord, {
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0,
                                13: 0,
                                14: 0,
                                15: 0,
                                16: 0,
                                17: 0,
                            })
                            await companyRepository.save(companyRecord)
                        }    
                    }
                    res.json({message: 'succeed in deleting record'})
                } catch(error: any) {
                    res.status(400).json({message: error.message});
                }
            })
        } else {
            res.json({message: 'error happend'})
        }
    } else {
        res.json({message: 'fail to delete record'})
    }
});

export default router;