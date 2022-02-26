import { User } from '../../entity/User';
import { TempUser } from '../../entity/TempUser';
import express from 'express';
import bcript from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer'
const saltRounds = 10;
import { getRepository } from 'typeorm';
const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const sentName = req.body.name
        const sentEmail = req.body.email
        const sentPassword = req.body.password;

        // 空欄なし
        if(!(sentName && sentEmail && sentPassword)) {
            return res.status(400).json({message: 'All input is required'})
        }

        const userRepository = getRepository(User);

        // ユーザーネームは重複不可
        const oldUser = await userRepository.findOne({
            where: {
                name: sentName
            }
        })
        if(oldUser) {
            return res.json({message: 'User already exists.'})
        }

        // パスワードをハッシュ化
        bcript.hash(sentPassword, saltRounds, async (err, hashedPassword) => {
            if(err) {
                return res.status(500).send(err)
            }

            // メール認証用トークン
            const token = crypto.randomBytes(16).toString('hex')
            const hashedToken = hashing(token)
            try {
                const temp_user = new TempUser()
                temp_user.name = sentName
                temp_user.email = sentEmail
                temp_user.password = hashedPassword
                temp_user.token = hashedToken

                const tempUserRepository = getRepository(TempUser)
                
                const insertedTempUser = await tempUserRepository.save(temp_user)

                const smtpConfig = {
                    host: process.env.EMAIL_HOST,
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_ADDRESS,
                        pass: process.env.EMAIL_PASSWORD
                    }
                }
                const transporter = nodemailer.createTransport(smtpConfig)

                const html ='<p>' + sentName + 'さん</p>' +
                            '<p>この度は、司法試験予備試験短答式対策アプリをご利用いただき誠にありがとうございます。</p>' +
                            '<p>ご本人様確認のため、下記URLへアクセスし、アカウントの本登録を完了させてください。</p>' +
                            '<h3><a href="' + process.env.FRONTEND_URL + '/email/' + token + '">'+ process.env.FRONTEND_URL + '/email/' + token +'</a></h3>' +
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
                }
                transporter.sendMail(mailOptions, (err, _) => {
                    if(err) {
                        res.status(500).send('mail server error')
                    } else {
                        res.status(200).json({
                            message: "仮登録しました",
                            data: [insertedTempUser.name, insertedTempUser.email]
                        });
                    }
                })
            } catch(error: any) {
                res.status(400).json({message: error.message});
            }
        })

    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
});

function hashing(data: string){
    const shasum = crypto.createHash('sha1');
    shasum.update(data);
    let hash = shasum.digest('hex');
    return hash;
}

export default router;