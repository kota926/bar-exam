import { User } from '../../entity/User';
import express from 'express';
import bcript from 'bcryptjs';
// const saltRounds = 10;
import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm';
const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
    const userRepository = getRepository(User);
    const userInDB = await userRepository.findOne({
        where: {
            name: req.body.name
        }
    }).catch((error) => {
        res.status(400).json({message: error.message});
    })

    if(!userInDB) {
        res.json({message: 'name not found'})
    } else {
        bcript.compare(req.body.password, userInDB.password, (error, result) => {
            if(error) {
                return res.status(400).json({errro: error.message})
            }
            if(!result) {
                res.json({message: "password is not correct"})
            } else {
                const payload = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    id: userInDB.id,
                    name: userInDB.name,
                    email: userInDB.email
                }
                const token = jwt.sign(payload, 'lawapp')
                res.json({token})
            }
        })
    }
});

export default router;