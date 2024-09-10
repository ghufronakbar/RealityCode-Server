const prisma = require('../../db/prisma')

const getAllMessage = async () => {
    const messages = await prisma.message.findMany(
        {
            orderBy: {
                createdAt: 'desc'
            },
        }
    )
    return messages
}

const getMessageById = async (id) => {
    const message = await prisma.message.findFirst({
        where: {
            id
        }
    })
    return message
}

const deleteMessage = async (id) => {
    const message = await prisma.message.delete({
        where: {
            id
        }
    })
    return message
}

const createMessage = async (name, email, message, file) => {
    const data = await prisma.message.create({
        data: {
            name,
            email,
            message,
            file,
        }
    })
    return data
}

module.exports = { getAllMessage, getMessageById, deleteMessage, createMessage }