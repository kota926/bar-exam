"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constitution_1 = require("../../entity/Constitution");
const Government_1 = require("../../entity/Government");
const Civil_1 = require("../../entity/Civil");
const Company_1 = require("../../entity/Company");
const User_1 = require("../../entity/User");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const bearToken = req.headers['authorization'];
    if (bearToken) {
        const bearer = bearToken.split(' ');
        const token = bearer[1];
        jsonwebtoken_1.default.verify(token, 'lawapp', async (err, _) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                switch (req.query.subject) {
                    case 'cons': {
                        const consRepository = (0, typeorm_1.getRepository)(Constitution_1.Constitution);
                        const record = await consRepository.findOne({
                            where: {
                                id: req.query.id
                            }
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        res.status(200).json(record);
                        break;
                    }
                    case 'gov': {
                        const govRepository = (0, typeorm_1.getRepository)(Government_1.Government);
                        const record = await govRepository.findOne({
                            where: {
                                id: req.query.id
                            }
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        res.status(200).json(record);
                        break;
                    }
                    case 'civil': {
                        const civilRepository = (0, typeorm_1.getRepository)(Civil_1.Civil);
                        const record = await civilRepository.findOne({
                            where: {
                                id: req.query.id
                            }
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        res.status(200).json(record);
                        break;
                    }
                    case 'company': {
                        const companyRepository = (0, typeorm_1.getRepository)(Company_1.Company);
                        const record = await companyRepository.findOne({
                            where: {
                                id: req.query.id
                            }
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        res.status(200).json(record);
                        break;
                    }
                    default:
                        res.json({ message: 'subject not found' });
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    else {
        res.json({ message: 'error happend' });
    }
});
router.put('/:recordId', async (req, res) => {
    const bearToken = req.headers['authorization'];
    let unit;
    if (typeof req.body.unit === 'string') {
        unit = req.body.unit;
    }
    if (bearToken) {
        const bearer = bearToken.split(' ');
        const token = bearer[1];
        jsonwebtoken_1.default.verify(token, 'lawapp', async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const userRepository = (0, typeorm_1.getRepository)(User_1.User);
                const userToUpdate = await userRepository.findOne(user.id);
                if (userToUpdate) {
                    userToUpdate.lastSubject = req.body.subject;
                    userToUpdate.lastUnit = req.body.unit;
                    userToUpdate.lastNumber = req.body.lastNum;
                    await userRepository.save(userToUpdate);
                }
                switch (req.body.subject) {
                    case 'cons': {
                        const consRepository = (0, typeorm_1.getRepository)(Constitution_1.Constitution);
                        consRepository.findOne(req.params.recordId)
                            .then(async (record) => {
                            consRepository.merge(record, { [unit]: req.body.index });
                            const results = await consRepository.save(record);
                            res.status(200).json(results);
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        break;
                    }
                    case 'gov': {
                        const govRepository = (0, typeorm_1.getRepository)(Government_1.Government);
                        govRepository.findOne(req.params.recordId)
                            .then(async (record) => {
                            govRepository.merge(record, { [unit]: req.body.index });
                            const results = await govRepository.save(record);
                            res.status(200).json(results);
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        break;
                    }
                    case 'civil': {
                        const civilRepository = (0, typeorm_1.getRepository)(Civil_1.Civil);
                        civilRepository.findOne(req.params.recordId)
                            .then(async (record) => {
                            civilRepository.merge(record, { [unit]: req.body.index });
                            const results = await civilRepository.save(record);
                            res.status(200).json(results);
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        break;
                    }
                    case 'company': {
                        const companyRepository = (0, typeorm_1.getRepository)(Company_1.Company);
                        companyRepository.findOne(req.params.recordId)
                            .then(async (record) => {
                            companyRepository.merge(record, { [unit]: req.body.index });
                            const results = await companyRepository.save(record);
                            res.status(200).json(results);
                        }).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        break;
                    }
                    default:
                        res.json({ message: 'subject not found' });
                }
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    else {
        res.json({ message: 'error happend' });
    }
});
router.put('/', (req, res) => {
    if (req.body.isDelete) {
        const bearToken = req.headers['authorization'];
        if (bearToken) {
            const bearer = bearToken.split(' ');
            const token = bearer[1];
            jsonwebtoken_1.default.verify(token, 'lawapp', async (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                try {
                    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
                    const userToUpdate = await userRepository.findOne(user.id);
                    if (userToUpdate) {
                        userToUpdate.lastSubject = "cons";
                        userToUpdate.lastUnit = "1";
                        userToUpdate.lastNumber = 0;
                        await userRepository.save(userToUpdate);
                        const consRepository = (0, typeorm_1.getRepository)(Constitution_1.Constitution);
                        const consRecord = await consRepository.findOne(userToUpdate.constitutionId).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        if (consRecord) {
                            consRepository.merge(consRecord, {
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0,
                                13: 0,
                                14: 0,
                                15: 0,
                                16: 0,
                                17: 0,
                                18: 0,
                                19: 0,
                                20: 0,
                                21: 0,
                                22: 0,
                                23: 0,
                                24: 0,
                            });
                            const results = await consRepository.save(consRecord);
                            console.log(results);
                        }
                        const govRepository = (0, typeorm_1.getRepository)(Government_1.Government);
                        const govRecord = await govRepository.findOne(userToUpdate.governmentId).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        if (govRecord) {
                            govRepository.merge(govRecord, {
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0,
                                13: 0,
                                14: 0,
                                15: 0,
                                16: 0,
                                17: 0,
                                18: 0,
                                19: 0,
                                20: 0,
                                21: 0,
                                22: 0,
                            });
                            const results = await govRepository.save(govRecord);
                            console.log(results);
                        }
                        const civilRepository = (0, typeorm_1.getRepository)(Civil_1.Civil);
                        const civilRecord = await civilRepository.findOne(userToUpdate.civilId).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        if (civilRecord) {
                            civilRepository.merge(civilRecord, {
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0,
                                13: 0,
                                14: 0,
                                15: 0,
                                16: 0,
                                17: 0,
                                18: 0,
                                19: 0,
                                20: 0,
                                21: 0,
                                22: 0,
                                23: 0,
                                24: 0,
                                25: 0,
                                26: 0,
                                27: 0,
                                28: 0,
                                29: 0,
                                30: 0,
                                31: 0,
                                32: 0,
                                33: 0,
                                34: 0,
                                35: 0,
                                36: 0,
                                37: 0,
                                38: 0,
                                39: 0,
                                40: 0,
                                41: 0,
                                42: 0,
                                43: 0,
                                44: 0,
                                45: 0,
                                46: 0,
                                47: 0,
                                48: 0,
                                49: 0,
                                50: 0,
                                51: 0,
                            });
                            const results = await civilRepository.save(civilRecord);
                            console.log(results);
                        }
                        const companyRepository = (0, typeorm_1.getRepository)(Company_1.Company);
                        const companyRecord = await companyRepository.findOne(userToUpdate.companyId).catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: err.message });
                        });
                        if (companyRecord) {
                            companyRepository.merge(companyRecord, {
                                1: 0,
                                2: 0,
                                3: 0,
                                4: 0,
                                5: 0,
                                6: 0,
                                7: 0,
                                8: 0,
                                9: 0,
                                10: 0,
                                11: 0,
                                12: 0,
                                13: 0,
                                14: 0,
                                15: 0,
                                16: 0,
                                17: 0,
                            });
                            const results = await companyRepository.save(companyRecord);
                            console.log(results);
                        }
                    }
                    res.json({ message: 'succeed in deleting record' });
                }
                catch (error) {
                    res.status(400).json({ message: error.message });
                }
            });
        }
        else {
            res.json({ message: 'error happend' });
        }
    }
    else {
        res.json({ message: 'fail to delete record' });
    }
});
exports.default = router;
//# sourceMappingURL=done.js.map