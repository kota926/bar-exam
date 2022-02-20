"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../entity/User");
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    const userInDB = await userRepository.findOne({
        where: {
            name: req.body.name
        }
    }).catch((error) => {
        res.status(400).json({ message: error.message });
    });
    if (!userInDB) {
        res.status(404).json({ message: 'name not found' });
    }
    else {
        bcryptjs_1.default.compare(req.body.password, userInDB.password, (error, result) => {
            if (error) {
                return res.status(400).json({ errro: error.message });
            }
            if (!result) {
                res.json({ message: "password is not correct" });
            }
            else {
                const payload = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    id: userInDB.id,
                    name: userInDB.name,
                    email: userInDB.email
                };
                const token = jsonwebtoken_1.default.sign(payload, 'lawapp');
                res.json({ token });
            }
        });
    }
});
exports.default = router;
//# sourceMappingURL=login.js.map