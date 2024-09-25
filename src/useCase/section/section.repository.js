const prisma = require('../../db/prisma')

const getAllSections = async () => {
    const sections = await prisma.section.findMany({
        include: {
            subsections: {
                include: {
                    _count: {
                        select: {
                            posts: true
                        }
                    }
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    })
    return sections
}

const createSection = async (title, description, subsections) => {
    const section = await prisma.section.create({
        data: {
            title,
            description,
            subsections: {
                createMany: {
                    data: subsections
                }
            }
        },
        include: {
            subsections: true
        }
    })
    return section
}

const createSubSection = async (title, description, sectionId) => {
    const subsection = await prisma.subSection.create({
        data: {
            title,
            description,
            sectionId
        }
    })
    return subsection
}

const editSection = async (id, title, description) => {
    const section = await prisma.section.update({
        where: {
            id
        },
        data: {
            title,
            description
        }
    })
    return section
}

const editSubSection = async (id, title, description) => {
    const subsection = await prisma.subSection.update({
        where: {
            id
        },
        data: {
            title,
            description
        }
    })
    return subsection
}

const deleteSubSection = async (id) => {
    const subsection = await prisma.subSection.delete({
        where: {
            id
        },
    })
    return subsection
}

const getSectionById = async (id) => {
    const section = await prisma.section.findUnique({
        where: {
            id
        },
        select: {
            id: true,
        }
    })
    return section
}

const getSubSecById = async (id) => {
    const subsection = await prisma.subSection.findUnique({
        where: {
            id
        },
        select: {
            id: true,
        }
    })
    return subsection
}

module.exports = {
    getAllSections,
    createSection,
    createSubSection,
    editSection,
    editSubSection,
    deleteSubSection,
    getSectionById,
    getSubSecById
}