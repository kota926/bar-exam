"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sample_1 = __importDefault(require("./sample"));
const choice_1 = __importDefault(require("./choice"));
const question_1 = __importDefault(require("./question"));
const done_1 = __importDefault(require("./done"));
const router = express_1.default.Router();
router.use('/sample', sample_1.default);
router.use('/choice', choice_1.default);
router.use('/question', question_1.default);
router.use('/done', done_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map