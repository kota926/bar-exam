"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../entity/User");
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const Constitution_1 = require("../../entity/Constitution");
const Government_1 = require("../../entity/Government");
const Civil_1 = require("../../entity/Civil");
const Company_1 = require("../../entity/Company");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const bearToken = req.headers['authorization'];
    if (bearToken) {
        const bearer = bearToken.split(' ');
        const token = bearer[1];
        jsonwebtoken_1.default.verify(token, 'lawapp', async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (user) {
                const userRepository = (0, typeorm_1.getRepository)(User_1.User);
                const userInDB = await userRepository.findOne({
                    where: {
                        id: user.id
                    },
                }).catch((err) => {
                    res.send(err);
                });
                res.json({
                    user: userInDB
                });
            }
            else {
                res.send('user not found');
            }
        });
    }
    else {
        res.json({ message: 'error happend' });
    }
});
router.put('/', async (req, res) => {
    const bearToken = req.headers['authorization'];
    if (bearToken) {
        const bearer = bearToken.split(' ');
        const token = bearer[1];
        if (req.body.name) {
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const oldUser = await userRepository.findOne({
                where: {
                    name: req.body.name
                }
            }).catch((err) => {
                res.send(err);
            });
            if (oldUser) {
                return res.status(409).json({ message: 'User already exists.' });
            }
            jsonwebtoken_1.default.verify(token, 'lawapp', async (err, user) => {
                if (err) {
                    return res.sendStatus(403).send(err);
                }
                if (user) {
                    const userToUpdate = await userRepository.findOne(user.id)
                        .catch((err) => {
                        res.send(err);
                    });
                    if (userToUpdate) {
                        userToUpdate.name = req.body.name;
                        const result = await userRepository.save(userToUpdate);
                        const payload = {
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            id: result.id,
                            name: result.name,
                            email: result.email
                        };
                        const token = jsonwebtoken_1.default.sign(payload, 'lawapp');
                        res.json({ token });
                    }
                }
                else {
                    res.send('user not found');
                }
            });
        }
        else if (req.body.email) {
            jsonwebtoken_1.default.verify(token, 'lawapp', async (err, user) => {
                if (err) {
                    return res.sendStatus(403).send(err);
                }
                if (user) {
                    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
                    const userToUpdate = await userRepository.findOne(user.id)
                        .catch((err) => {
                        res.send(err);
                    });
                    if (userToUpdate) {
                        userToUpdate.email = req.body.email;
                        const result = await userRepository.save(userToUpdate);
                        const payload = {
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            id: result.id,
                            name: result.name,
                            email: result.email
                        };
                        const token = jsonwebtoken_1.default.sign(payload, 'lawapp');
                        res.json({ token });
                    }
                }
                else {
                    res.send('user not found');
                }
            });
        }
        else if (req.body.oldPassword && req.body.newPassword) {
            jsonwebtoken_1.default.verify(token, 'lawapp', async (err, user) => {
                if (err) {
                    return res.sendStatus(403).send(err);
                }
                if (user) {
                    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
                    const userToUpdate = await userRepository.findOne(user.id)
                        .catch((err) => {
                        res.send(err);
                    });
                    if (userToUpdate) {
                        bcryptjs_1.default.compare(req.body.oldPassword, userToUpdate.password, async (error, result) => {
                            if (error) {
                                return res.status(400).json({ errro: error.message });
                            }
                            if (!result) {
                                res.json({ message: "password is not correct" });
                            }
                            else {
                                bcryptjs_1.default.hash(req.body.newPassword, saltRounds, async (err, hashedPassword) => {
                                    if (err) {
                                        return res.send(err);
                                    }
                                    userToUpdate.password = hashedPassword;
                                    const result = await userRepository.save(userToUpdate);
                                    const payload = {
                                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                        id: result.id,
                                        name: result.name,
                                        email: result.email
                                    };
                                    const token = jsonwebtoken_1.default.sign(payload, 'lawapp');
                                    res.json({ token });
                                });
                            }
                        });
                    }
                }
                else {
                    res.send('user not found');
                }
            });
        }
    }
    else {
        res.json({ message: 'error happend' });
    }
});
router.delete('/', (req, res) => {
    console.log('deleting user');
    console.log(req.headers);
    const bearToken = req.headers['authorization'];
    if (bearToken) {
        const bearer = bearToken.split(' ');
        const token = bearer[1];
        jsonwebtoken_1.default.verify(token, 'lawapp', async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (user) {
                const userRepository = (0, typeorm_1.getRepository)(User_1.User);
                const userToDelete = await userRepository.findOne(user.id)
                    .catch((err) => {
                    res.send(err);
                });
                if (userToDelete) {
                    bcryptjs_1.default.compare(req.body.password, userToDelete.password, async (error, result) => {
                        if (error) {
                            return res.status(400).json({ error: error.message });
                        }
                        if (!result) {
                            return res.json({ message: "password is not correct" });
                        }
                        try {
                            const deletedResult = await userRepository.remove(userToDelete);
                            const consRepository = (0, typeorm_1.getRepository)(Constitution_1.Constitution);
                            const consToDelete = await consRepository.findOne(deletedResult.constitutionId);
                            if (consToDelete) {
                                await consRepository.remove(consToDelete);
                            }
                            const govRepository = (0, typeorm_1.getRepository)(Government_1.Government);
                            const govToDelete = await govRepository.findOne(deletedResult.governmentId);
                            if (govToDelete) {
                                await govRepository.remove(govToDelete);
                            }
                            const civilRepository = (0, typeorm_1.getRepository)(Civil_1.Civil);
                            const civilToDelete = await civilRepository.findOne(deletedResult.civilId);
                            if (civilToDelete) {
                                await civilRepository.remove(civilToDelete);
                            }
                            const companyRepository = (0, typeorm_1.getRepository)(Company_1.Company);
                            const companyToDelete = await companyRepository.findOne(deletedResult.companyId);
                            if (companyToDelete) {
                                await companyRepository.remove(companyToDelete);
                            }
                            res.json({ user: userToDelete });
                        }
                        catch (err) {
                            res.send(err);
                        }
                    });
                }
                else {
                    res.send('an error happened');
                }
            }
            else {
                res.send('user not found');
            }
        });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map