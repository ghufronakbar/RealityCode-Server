const { getAllSections, createSection, createSubSection, editSection, editSubSection, deleteSubSection, getSectionById, getSubSecById } = require('./section.repository')

const getAllSectionService = async () => {
    const sections = await getAllSections()
    return sections
}

const createSectionservice = async (title, description) => {
    const section = await createSection(title, description)
    return section
}

const createSubSectionService = async (title, description, sectionId, image) => {
    const numSecId = Number(sectionId)
    if (isNaN(numSecId)) {
        return new Error('Section ID must be a number')
    }
    const check = await getSectionById(numSecId)
    if (!check) {
        return new Error('Section not found')
    }
    if (!image) {
        return new Error('Image not found')
    }
    const subsection = await createSubSection(title, description, numSecId, image.path)
    return subsection
}

const editSectionService = async (id, title, description) => {
    const check = await getSectionById(id)
    if (!check) {
        return new Error('Section not found')
    }
    const section = await editSection(id, title, description)
    return section
}

const editSubSectionService = async (id, title, description) => {
    const check = await getSubSecById(id)
    if (!check) {
        return new Error('Subsection not found')
    }
    const subsection = await editSubSection(id, title, description)
    return subsection
}

const deleteSubSectionService = async (id) => {
    const check = await getSubSecById(id)
    if (!check) {
        return new Error('Subsection not found')
    }
    const subsection = await deleteSubSection(id)
    return subsection
}

module.exports = {
    getAllSectionService,
    createSectionservice,
    createSubSectionService,
    editSectionService,
    editSubSectionService,
    deleteSubSectionService
}