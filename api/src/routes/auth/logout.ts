// import { User } from '../../entity/User';
// import bcript from 'bcryptjs';
// const saltRounds = 10;
// import jwt from 'jsonwebtoken'
// import { getConnection, getRepository } from 'typeorm';
import express from 'express';
const router = express.Router()

router.post('/', async (_: express.Request, res: express.Response) => {
    res.json({message: 'user logged out'})
});

export default router;