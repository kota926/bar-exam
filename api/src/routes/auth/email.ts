// import { AuthUser } from '../../entity/AuthUser';
import { User } from '../../entity/User'
import { TempUser } from '../../entity/TempUser';
// import { Constitution } from '../../entity/Constitution'
import express from 'express';
// import bcript, { compare } from 'bcryptjs';
import crypto from 'crypto'
// const saltRounds = 10;
import { getRepository } from 'typeorm';
const router = express.Router()

router.post('/', (req: express.Request, res: express.Response) => {
    const hashedToken = hashing(req.body.token)
    console.log(req.body.token)
    console.log(hashedToken)
    const tempUserRepository = getRepository(TempUser)
    tempUserRepository.findOne({
        where: {
            token: hashedToken
        }
    }).then(async (tempUserInDB) => {
        console.log(tempUserInDB)
        const jstNow = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
        console.log(jstNow)
        if(!tempUserInDB) {
            return res.json({message: 'wrong token'})
        } else {
            // const authUser = new AuthUser()
            // authUser.name = tempUserInDB.name
            // authUser.email = tempUserInDB.email
            // authUser.password = tempUserInDB.password

            // const authUserRepository = getRepository(AuthUser)

            // const insertedAuthUser = await authUserRepository.save(authUser).catch((err) => {
            //     return res.send(err)
            // })
            // const constitution = new Constitution()
            // const constitutionRepository = getRepository(Constitution)
            // await constitutionRepository.save(constitution)

            const user = new User()
            user.name = tempUserInDB.name
            user.email = tempUserInDB.email
            user.password = tempUserInDB.password
            user.lastQuestion = '0'
            // user.authUser = authUser
            // user.constitution = constitution

            const userRepository = getRepository(User)

            const insertedUser = await userRepository.save(user).catch((err) => {
                return res.send(err)
            })

            
            await tempUserRepository.remove(tempUserInDB).catch((err) => {
                return res.send(err)
            })
            return res.status(200).json({message: 'Email verification successed', data: insertedUser})  
        }
    }).catch((err) => {
        return res.send(err)
    })
});

function hashing(data: string){
    const shasum = crypto.createHash('sha1');
    shasum.update(data);
    let hash = shasum.digest('hex');
    return hash;
}

export default router;