"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../entity/User");
const TempUser_1 = require("../../entity/TempUser");
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const saltRounds = 10;
const typeorm_1 = require("typeorm");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const sentName = req.body.name;
        const sentEmail = req.body.email;
        const sentPassword = req.body.password;
        if (!(sentName && sentEmail && sentPassword)) {
            return res.status(400).json({ message: 'All input is required' });
        }
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const oldUser = await userRepository.findOne({
            where: {
                name: sentName
            }
        });
        if (oldUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }
        bcryptjs_1.default.hash(sentPassword, saltRounds, async (err, hashedPassword) => {
            if (err) {
                return res.send(err);
            }
            const token = crypto_1.default.randomBytes(16).toString('hex');
            const hashedToken = hashing(token);
            try {
                const temp_user = new TempUser_1.TempUser();
                temp_user.name = sentName;
                temp_user.email = sentEmail;
                temp_user.password = hashedPassword;
                temp_user.token = hashedToken;
                const tempUserRepository = (0, typeorm_1.getRepository)(TempUser_1.TempUser);
                const insertedTempUser = await tempUserRepository.save(temp_user);
                const smtpConfig = {
                    host: process.env.EMAIL_HOST,
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_ADDRESS,
                        pass: process.env.EMAIL_PASSWORD
                    }
                };
                const transporter = nodemailer_1.default.createTransport(smtpConfig);
                const html = '<p>' + sentName + 'さん</p>' +
                    '<p>この度は、司法試験予備試験短答式対策アプリをご利用いただき誠にありがとうございます。</p>' +
                    '<p>ご本人様確認のため、下記URLへアクセスし、アカウントの本登録を完了させてください。</p>' +
                    '<h3><a href="' + process.env.FRONTEND_URL + '/email/' + token + '">' + process.env.FRONTEND_URL + 'email/' + token + '</a></h3>' +
                    '<p>--------------------------------------------------------------------------------------------' +
                    '-----------------------------------------------------------------------------------------------</p>' +
                    '<p>※このメールはシステムにより自動送信されております。このメールへの返信はご遠慮いただきますようお願いいたします。</p>' +
                    '<p>--------------------------------------------------------------------------------------------' +
                    '-----------------------------------------------------------------------------------------------</p>';
                const mailOptions = {
                    from: process.env.EMAIL_ADDRESS,
                    to: sentEmail,
                    subject: '認証メール（短答式試験対策アプリ）',
                    html: html
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('mail server error');
                    }
                    else {
                        console.log(info);
                        res.status(200).json({
                            message: "仮登録しました",
                            data: [insertedTempUser.name, insertedTempUser.email]
                        });
                    }
                });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
function hashing(data) {
    const shasum = crypto_1.default.createHash('sha1');
    shasum.update(data);
    let hash = shasum.digest('hex');
    return hash;
}
exports.default = router;
//# sourceMappingURL=signup.js.map