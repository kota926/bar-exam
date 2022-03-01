import { User } from '../../entity/User'
import { TempUser } from '../../entity/TempUser';
import { Constitution } from '../../entity/Constitution'
import { Government } from '../../entity/Government';
import { Civil } from '../../entity/Civil';
import { Company } from '../../entity/Company';
import express from 'express';
import crypto from 'crypto'
import { getRepository } from 'typeorm';
const router = express.Router()

router.post('/', (req: express.Request, res: express.Response) => {
    const hashedToken = hashing(req.body.token)
    const tempUserRepository = getRepository(TempUser)
    tempUserRepository.findOne({
        where: {
            token: hashedToken
        }
    }).then(async (tempUserInDB) => {
        if(!tempUserInDB) {
            return res.json({message: 'wrong token'})
        } else {
            const constitution = new Constitution();
            const consRepository = getRepository(Constitution)
            await consRepository.save(constitution).catch((err) => {
                return res.send(err)
            })

            const government = new Government()
            const govRepository = getRepository(Government)
            await govRepository.save(government).catch((err) => {
                return res.send(err)
            })

            const civil = new Civil()
            const civilRepository = getRepository(Civil)
            await civilRepository.save(civil).catch((err) => {
                return res.send(err)
            })

            const company = new Company()
            const companyRepository  = getRepository(Company)
            await companyRepository.save(company).catch((err) => {
                return res.send(err)
            })

            const user = new User()
            user.name = tempUserInDB.name
            user.email = tempUserInDB.email
            user.password = tempUserInDB.password
            user.lastSubject = 'cons'
            user.lastUnit = '1'
            user.lastNumber = 0
            user.constitution = constitution
            user.government = government
            user.civil = civil
            user.company = company
            
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