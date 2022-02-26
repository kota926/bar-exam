import express from 'express';
const router = express.Router()

router.post('/', async (_: express.Request, res: express.Response) => {
    res.json({message: 'user logged out'})
});

export default router;