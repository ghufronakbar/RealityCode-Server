const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getAdminByEmail, updateTokenAdmin } = require('./account.repository')
const { JWT_SECRET } = require('../../constant')


const authLogin = async (email, password) => {
    const admin = await getAdminByEmail(email)
    if (!admin) {
        return new Error('Email tidak terdaftar')
    }
    const isValidPassword = await bcrypt.compare(password, admin.password)
    if (!isValidPassword) {
        return new Error('Password salah')
    }
    const accessToken = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '24h' })
    await updateTokenAdmin(admin.id, refreshToken)
    return { accessToken, refreshToken }
}

module.exports = { authLogin }