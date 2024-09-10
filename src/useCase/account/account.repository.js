const prisma = require('../../db/prisma')

const getAdminByEmail = async (email) => {
    const pengurus = await prisma.admin.findFirst({
        where: {
            email
        },
    })
    return pengurus
}

const updateTokenAdmin = async (id, token) => {
    const pengurus = await prisma.admin.update({
        where: {
            id
        },
        data: {
            refreshToken: token
        }
    })
    return pengurus
}


module.exports = {
    getAdminByEmail,
    updateTokenAdmin
}