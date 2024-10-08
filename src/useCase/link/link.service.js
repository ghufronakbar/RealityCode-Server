const { getAllLink, createLink, deleteLink, getLinkById, updateLink } = require("./link.repository")

const getAllLinkService = async () => {
    const link = await getAllLink()
    return link
}

const createLinkService = async (title, desc, url, icon) => {
    const link = await createLink(title, desc, url, icon)
    return link
}

const updateLinkService = async (id, title, desc, url, icon) => {
    const validate = await getLinkById(id)
    if (validate === 0) return new Error('Link not found')
    const link = await updateLink(id, title, desc, url, icon)
    return link
}

const deleteLinkService = async (id) => {
    const validate = await getLinkById(id)
    if (validate === 0) return new Error('Link not found')
    const link = await deleteLink(id)
    return link
}

module.exports = { getAllLinkService, createLinkService, deleteLinkService, updateLinkService }