const { getAllMessageService, getMessageByIdService, deleteMessageService, createMessageService } = require('./message.service');

const getAllMessageController = async (req, res) => {
    const messages = await getAllMessageService()
    try {
        return res.status(200).json({ status: 200, message: 'Get all message success', data: messages })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const getMessageByIdController = async (req, res) => {
    const id = Number(req.params.id)
    try {
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        const message = await getMessageByIdService(id)
        if (message instanceof Error) {
            return res.status(400).json({ status: 400, message: message.message })
        }
        return res.status(200).json({ status: 200, message: 'Get message success', data: message })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const deleteMessageController = async (req, res) => {
    const id = Number(req.params.id)
    try {
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        const message = await deleteMessageService(id)
        if (message instanceof Error) {
            return res.status(400).json({ status: 400, message: message.message })
        }
        return res.status(200).json({ status: 200, message: 'Delete message success', data: message })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const createMessageController = async (req, res) => {
    const { name, email, message } = req.body
    const file = req.file || null
    try {
        if(!name || !email || !message) {
            return res.status(400).json({ status: 400, message: 'All fields must be filled' })
        }
        const data = await createMessageService(name, email, message, file)
        if (data instanceof Error) {
            return res.status(400).json({ status: 400, message: data.message })
        }
        return res.status(200).json({ status: 200, message: 'Create message success', data: data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

module.exports = { getAllMessageController, getMessageByIdController, deleteMessageController, createMessageController }