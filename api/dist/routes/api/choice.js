"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Choice_1 = require("../../entity/Choice");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        const choiceRepository = (0, typeorm_1.getRepository)(Choice_1.Choice);
        const choices = await choiceRepository.find({
            relations: ["question"],
            where: {
                subject: req.query.subject,
                unit: req.query.unit
            }
        });
        res.status(200).json(choices);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.post('/', (_, res) => {
    try {
        res.status(200).json({ message: "登録しました" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=choice.js.map