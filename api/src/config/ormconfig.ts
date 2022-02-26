import { ConnectionOptions } from 'typeorm'

const ormconfig: ConnectionOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
      "dist/entity/**/*.js"
    ],
    migrations: [
      "dist/migration/**/*{.ts,.js}"
    ],
    subscribers: [
      "dist/subscriber/**/*.js"
    ],
    cli: {
      "entitiesDir": "dist/entity",
      "migrationsDir": "dist/migration",
      "subscribersDir": "dist/subscriber"
    }
}

export default ormconfig;