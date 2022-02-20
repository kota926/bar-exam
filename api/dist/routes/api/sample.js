"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_, res) => {
    try {
        res.status(200).json({ userId: "U001", userName: "Yamada Taro" });
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
//# sourceMappingURL=sample.js.map