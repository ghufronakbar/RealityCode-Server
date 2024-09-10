const prisma = require('../../db/prisma')

const getAllLink = async () => {
    const links = await prisma.link.findMany()
    return links
}

const getLinkById = async (id) => {
    const link = await prisma.link.count({
        where: {
            id
        }
    })
    return link
}

const createLink = async (title, desc, url, icon) => {
    const link = await prisma.link.create({
        data: {
            title,
            desc,
            url,
            icon,
        }
    })
    return link
}

const deleteLink = async (id) => {
    const link = await prisma.link.delete({
        where: {
            id
        }
    })
    return link
}

module.exports = { getAllLink, getLinkById, createLink, deleteLink }