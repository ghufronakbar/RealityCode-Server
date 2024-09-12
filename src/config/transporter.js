const { MAIL_HOST, MAIL_USER, MAIL_PASS, MAIL_PORT } = require('../constant/nodeMailer')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
});

module.exports = transporter