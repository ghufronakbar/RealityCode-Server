const transporter = require('../config/transporter')
const mailContent = require('../helper/mailContent')

const sendMail = async (target, name, body) => {
    try {
        await transporter.sendMail({
            sender: 'Reality Code <reality.code@outlook.com>',
            from: 'Reality Code',
            to: target,
            subject: 'Reply from Reality Code',
            html: mailContent(name, body)
        })
    } catch (error) {
        console.log(error);
        return new Error("Email could not be sent")
    }
}

module.exports = sendMail