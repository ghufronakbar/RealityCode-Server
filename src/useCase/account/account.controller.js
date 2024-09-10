
const { authLogin } = require('./account.service');

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'Email and password are required'
            })
        }
        const token = await authLogin(email, password)
        if (token instanceof Error) {
            return res.status(401).json({ status: 401, message: token.message });
        }
        
        res.cookie('refreshToken', token.refreshToken)

        return res.status(200).json({ status: 200, message: 'Login Success', token: { accessToken: token.accessToken, refreshToken: token.refreshToken } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}


module.exports = { login }