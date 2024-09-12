const { getAllMessage, getMessageById, deleteMessage, createMessage } = require("./message.repository")
const removeCloudinary = require("../../utils/removeCloudinary")
const isProhibited = require("../../utils/isProhibited")
const prohibitedWords = require("../../helper/prohibitedWords")
const sendMail = require("../../utils/sendMail")

const getAllMessageService = async () => {
    const messages = await getAllMessage()
    return messages
}

const getMessageByIdService = async (id) => {
    const message = await getMessageById(id)
    if (!message) return new Error('Message not found')
    return message
}

const deleteMessageService = async (id) => {
    const validate = await getMessageById(id)
    if (!validate) return new Error('Link not found')
    if (validate.file !== null) {
        const cloudinary = await removeCloudinary(validate.file, "message")
        if (cloudinary instanceof Error) return cloudinary
    }
    const link = await deleteMessage(id)
    return link
}

const createMessageService = async (name, email, message, file) => {
    let urlFile
    if (file) {
        urlFile = file.path
    }
    const prohibited = await isProhibited(message, prohibitedWords)
    if (prohibited) {
        return new Error('Message contains prohibited words')
    }
    const data = await createMessage(name, email, message, urlFile)
    return data
}

const replyMailService = async (email, name, message) => {
    const mail = await sendMail(email, name, message)
    if (mail instanceof Error) {
        return new Error('Email could not be sent')
    }
}

module.exports = { getAllMessageService, getMessageByIdService, deleteMessageService, createMessageService, replyMailService }