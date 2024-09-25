const isValidSubsection = require('../../utils/isValidSubsection');
const { getAllSectionService, createSectionservice, createSubSectionService, editSectionService, editSubSectionService, deleteSubSectionService } = require('./section.service');

const sections = async (req, res) => {
    try {
        return res.status(200).json({ status: 200, message: 'Get all section success', data: await getAllSectionService() })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const createSection = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title || !description) {
            return res.status(400).json({ status: 400, message: 'All fields must be filled' })
        }        
        const section = await createSectionservice(title, description)
        if (section instanceof Error) {
            return res.status(400).json({ status: 400, message: section.message })
        }
        return res.status(200).json({ status: 200, message: 'Create section success', data: section })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const createSubSection = async (req, res) => {
    const { title, description, sectionId } = req.body
    const image = req.file
    try {
        if (!title || !description || !sectionId) {
            return res.status(400).json({ status: 400, message: 'All fields must be filled' })
        }
        const subSection = await createSubSectionService(title, description, sectionId, image)
        if (subSection instanceof Error) {
            return res.status(400).json({ status: 400, message: subSection.message })
        }
        return res.status(200).json({ status: 200, message: 'Create sub section success', data: subSection })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const editSection = async (req, res) => {
    const id = Number(req.params.id)
    const { title, description } = req.body
    try {
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        if (!title || !description) {
            return res.status(400).json({ status: 400, message: 'All fields must be filled' })
        }

        const section = await editSectionService(id, title, description)
        if (section instanceof Error) {
            return res.status(400).json({ status: 400, message: section.message })
        }
        return res.status(200).json({ status: 200, message: 'Edit section success', data: section })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const editSubSection = async (req, res) => {
    const id = Number(req.params.id)
    const { title, description } = req.body
    try {
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        if (!title || !description) {
            return res.status(400).json({ status: 400, message: 'All fields must be filled' })
        }

        const subSection = await editSubSectionService(id, title, description)
        if (subSection instanceof Error) {
            return res.status(400).json({ status: 400, message: subSection.message })
        }
        return res.status(200).json({ status: 200, message: 'Edit sub section success', data: subSection })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const deleteSubSection = async (req, res) => {
    const id = Number(req.params.id)
    try {
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        const subSection = await deleteSubSectionService(id)
        if (subSection instanceof Error) {
            return res.status(400).json({ status: 400, message: subSection.message })
        }
        return res.status(200).json({ status: 200, message: 'Delete sub section success', data: subSection })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

module.exports = {
    sections,
    createSection,
    createSubSection,
    editSection,
    editSubSection,
    deleteSubSection
}