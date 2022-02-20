"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("./config/ormconfig"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
(0, typeorm_1.createConnection)(ormconfig_1.default).then(async () => {
    const app = (0, express_1.default)();
    const options = {
        credentials: true,
        optionsSuccessStatus: 200,
        origin: [process.env.FRONTEND_URL]
    };
    console.log(options);
    app.use((0, cors_1.default)(options));
    app.use(express_1.default.json());
    app.use('/', index_1.default);
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log('Express server is listening on port' + port);
    });
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map