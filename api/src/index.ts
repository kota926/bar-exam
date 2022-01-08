import express from 'express'
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import router from './routes/index'


createConnection().then(async () => {
    const app = express();
    app.use(express.json());

    app.use('/', router)

    const port = process.env.PORT || 8080;

    app.listen(port, () => {
        console.log('Express server is listening on port' + port)
    })
}).catch((err) => {
    console.log(err)
})