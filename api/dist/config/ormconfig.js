"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        "entity/**/*.js"
    ],
    migrations: [
        "migration/**/*.js"
    ],
    subscribers: [
        "subscriber/**/*.js"
    ],
    cli: {
        "entitiesDir": "entity",
        "migrationsDir": "migration",
        "subscribersDir": "subscriber"
    }
};
exports.default = ormconfig;
//# sourceMappingURL=ormconfig.js.map