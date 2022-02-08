import { User } from '../../entity/User';
import express from 'express';
// import bcript from 'bcryptjs';
// const saltRounds = 10;
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getRepository } from 'typeorm';
const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    console.log('user dir')
    console.log(req.headers)
    const bearToken = req.headers['authorization']
    if(bearToken) {
        const bearer = bearToken.split(' ')
        const token = bearer[1]

        jwt.verify(token, 'secret', async (err,user: JwtPayload)=>{
            if(err) {
                return res.sendStatus(403)
            }
            if(user) {
                const userRepository = getRepository(User)
                const userInDB = await userRepository.findOne({
                    where: {
                        id: user.id
                    }
                }).catch((err) => {
                    res.send(err)
                })
                
                console.log(user)
                console.log(userInDB)
                res.json({
                    user: userInDB
                });
            } else {
                res.send('user not found')
            }
        })
    } else {
        res.json({message: 'error happend'})
    }
});

export default router;