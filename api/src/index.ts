import express from 'express'
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import  connectionOption from "./config/ormconfig"

import router from './routes/index'

import cors from 'cors'


createConnection(connectionOption).then(async () => {
    const app = express();
    const options: cors.CorsOptions = {
        credentials: true,
        optionsSuccessStatus: 200,
        origin: [process.env.FRONTEND_URL]
    }
    console.log(options)
    app.use(cors(options))
    app.use(express.json());

    app.use('/', router)

    const port = process.env.PORT || 8080;

    app.listen(port, () => {
        console.log('Express server is listening on port' + port)
    })
}).catch((err) => {
    console.log(err)
})