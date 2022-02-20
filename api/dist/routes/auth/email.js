"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../entity/User");
const TempUser_1 = require("../../entity/TempUser");
const Constitution_1 = require("../../entity/Constitution");
const Government_1 = require("../../entity/Government");
const Civil_1 = require("../../entity/Civil");
const Company_1 = require("../../entity/Company");
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
router.post('/', (req, res) => {
    const hashedToken = hashing(req.body.token);
    console.log(req.body.token);
    console.log(hashedToken);
    const tempUserRepository = (0, typeorm_1.getRepository)(TempUser_1.TempUser);
    tempUserRepository.findOne({
        where: {
            token: hashedToken
        }
    }).then(async (tempUserInDB) => {
        console.log(tempUserInDB);
        const jstNow = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
        console.log(jstNow);
        if (!tempUserInDB) {
            return res.json({ message: 'wrong token' });
        }
        else {
            const constitution = new Constitution_1.Constitution();
            const consRepository = (0, typeorm_1.getRepository)(Constitution_1.Constitution);
            await consRepository.save(constitution).catch((err) => {
                return res.send(err);
            });
            const government = new Government_1.Government();
            const govRepository = (0, typeorm_1.getRepository)(Government_1.Government);
            await govRepository.save(government).catch((err) => {
                return res.send(err);
            });
            const civil = new Civil_1.Civil();
            const civilRepository = (0, typeorm_1.getRepository)(Civil_1.Civil);
            await civilRepository.save(civil).catch((err) => {
                return res.send(err);
            });
            const company = new Company_1.Company();
            const companyRepository = (0, typeorm_1.getRepository)(Company_1.Company);
            await companyRepository.save(company).catch((err) => {
                return res.send(err);
            });
            const user = new User_1.User();
            user.name = tempUserInDB.name;
            user.email = tempUserInDB.email;
            user.password = tempUserInDB.password;
            user.lastSubject = 'cons';
            user.lastUnit = '1';
            user.lastNumber = 0;
            user.constitution = constitution;
            user.government = government;
            user.civil = civil;
            user.company = company;
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const insertedUser = await userRepository.save(user).catch((err) => {
                return res.send(err);
            });
            await tempUserRepository.remove(tempUserInDB).catch((err) => {
                return res.send(err);
            });
            return res.status(200).json({ message: 'Email verification successed', data: insertedUser });
        }
    }).catch((err) => {
        return res.send(err);
    });
});
function hashing(data) {
    const shasum = crypto_1.default.createHash('sha1');
    shasum.update(data);
    let hash = shasum.digest('hex');
    return hash;
}
exports.default = router;
//# sourceMappingURL=email.js.map