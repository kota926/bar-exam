import express from 'express';
import signupRouter from './signup'
import emailRouter from './email'
import loginRouter from './login'
import userRouter from './user'
import logoutRouter from './logout'

const router = express.Router();

router.use('/signup', signupRouter)
router.use('/email', emailRouter)
router.use('/login', loginRouter)
router.use('/user', userRouter)
router.use('/logout', logoutRouter)

export default router;