"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("./signup"));
const email_1 = __importDefault(require("./email"));
const login_1 = __importDefault(require("./login"));
const user_1 = __importDefault(require("./user"));
const logout_1 = __importDefault(require("./logout"));
const router = express_1.default.Router();
router.use('/signup', signup_1.default);
router.use('/email', email_1.default);
router.use('/login', login_1.default);
router.use('/user', user_1.default);
router.use('/logout', logout_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map