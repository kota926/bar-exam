"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Question_1 = require("../../entity/Question");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
router.get('/', async (_, res) => {
    try {
        const questionRepository = (0, typeorm_1.getRepository)(Question_1.Question);
        const questions = await questionRepository
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.choices', 'choice')
            .where('choice.subject = :subject', { subject: "憲法" })
            .andWhere('choice.unit = :unit', { unit: 11 })
            .getMany();
        res.status(200).json(questions);
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
//# sourceMappingURL=question.js.map