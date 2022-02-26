import express from 'express'
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import  config from "./config/ormconfig"

import router from './routes/index'

import cors from 'cors'


createConnection(config).then(async () => {
    const app = express();
    const options: cors.CorsOptions = {
        credentials: true,
        optionsSuccessStatus: 200,
        origin: [
            process.env.CORS_URL,
            process.env.FRONTEND_UEL
        ]
    }
    app.use(cors(options))
    app.use(express.json());

    app.use('/backend', router)

    const port = process.env.PORT || 8080;

    app.listen(port, () => {
        console.log('Express server is listening on port' + port)
    })
}).catch((err) => {
    console.log(err)
})