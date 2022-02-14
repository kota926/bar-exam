import { User } from '../../entity/User';
import express from 'express';
import bcript from 'bcryptjs';
const saltRounds = 10;
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

        jwt.verify(token, 'lawapp', async (err, user: JwtPayload)=>{
            if(err) {
                return res.sendStatus(403)
            }
            if(user) {
                const userRepository = getRepository(User)
                const userInDB = await userRepository.findOne({
                    where: {
                        id: user.id
                    },
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

router.put('/', async (req: express.Request, res: express.Response) => {
    console.log('user put')
    console.log(req.headers)
    const bearToken = req.headers['authorization']
    if(bearToken) {
        const bearer = bearToken.split(' ')
        const token = bearer[1]
        
        if(req.body.name) {
            const userRepository = getRepository(User);
            // ユーザーネームは重複不可
            const oldUser = await userRepository.findOne({
                where: {
                    name: req.body.name
                }
            }).catch((err) => {
                res.send(err)
            })
            if(oldUser) {
                return res.status(409).json({message: 'User already exists.'})
            }
            jwt.verify(token, 'lawapp', async (err, user: JwtPayload)=>{
                if(err) {
                    return res.sendStatus(403).send(err)
                }
                if(user) {
                    // const userRepository = getRepository(User)
                    const userToUpdate = await userRepository.findOne(user.id)
                    .catch((err) => {
                        res.send(err)
                    })
                    if(userToUpdate) {
                        userToUpdate.name = req.body.name
                        const result = await userRepository.save(userToUpdate)
                        console.log(result)
                        const payload = {
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            id: result.id,
                            name: result.name,
                            email: result.email
                        }
                        const token = jwt.sign(payload, 'lawapp')
                        console.log('logindir')
                        console.log(payload)
                        console.log(token)
                        res.json({token})
                    }
                } else {
                    res.send('user not found')
                }
            })
        } else if(req.body.email) {
            jwt.verify(token, 'lawapp', async (err, user: JwtPayload)=>{
                if(err) {
                    return res.sendStatus(403).send(err)
                }
                if(user) {
                    const userRepository = getRepository(User)
                    const userToUpdate = await userRepository.findOne(user.id)
                    .catch((err) => {
                        res.send(err)
                    })
                    if(userToUpdate) {
                        userToUpdate.email = req.body.email
                        const result = await userRepository.save(userToUpdate)
                        console.log(result)
                        const payload = {
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            id: result.id,
                            name: result.name,
                            email: result.email
                        }
                        const token = jwt.sign(payload, 'lawapp')
                        console.log('logindir')
                        console.log(payload)
                        console.log(token)
                        res.json({token})
                    }
                } else {
                    res.send('user not found')
                }
            })
        } else if(req.body.oldPassword && req.body.newPassword) {
            jwt.verify(token, 'lawapp', async (err, user: JwtPayload)=>{
                if(err) {
                    return res.sendStatus(403).send(err)
                }
                if(user) {
                    const userRepository = getRepository(User)
                    const userToUpdate = await userRepository.findOne(user.id)
                    .catch((err) => {
                        res.send(err)
                    })
                    if(userToUpdate) {
                        bcript.compare(req.body.oldPassword, userToUpdate.password, async (error, result) => {
                            if(error) {
                                return res.status(400).json({errro: error.message})
                            }
                            if(!result) {
                                res.json({message: "password is not correct"})
                            } else {
                                 // パスワードをハッシュ化
                                bcript.hash(req.body.newPassword, saltRounds, async (err, hashedPassword) => {
                                    if(err) {
                                        return res.send(err)
                                    }
                                    userToUpdate.password = hashedPassword
                                    const result = await userRepository.save(userToUpdate)
                                    console.log(result)
                                    const payload = {
                                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                        id: result.id,
                                        name: result.name,
                                        email: result.email
                                    }
                                    const token = jwt.sign(payload, 'lawapp')
                                    console.log('logindir')
                                    console.log(payload)
                                    console.log(token)
                                    res.json({token})
                                    })
                            }
                        })
                        
                    }
                } else {
                    res.send('user not found')
                }
            })
        }
    } else {
        res.json({message: 'error happend'})
    }
})

export default router;