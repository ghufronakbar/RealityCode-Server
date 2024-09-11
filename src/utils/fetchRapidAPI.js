const axios = require('axios');
const { X_RAPID_API_KEY, X_RAPID_HOST_TIKTOK, X_RAPID_HOST_INSTAGRAM,
    X_RAPID_HOST_THREADS, X_RAPID_PATH_TIKTOK, X_RAPID_PATH_INSTAGRAM,
    X_RAPID_PATH_THREADS } = require('../constant/rapid')

const fetchRapidAPI = async (fetchSocial) => {
    let host
    let path
    switch (fetchSocial) {
        case "tiktok":
            host = X_RAPID_HOST_TIKTOK
            path = X_RAPID_PATH_TIKTOK
            break
        case "instagram":
            host = X_RAPID_HOST_INSTAGRAM
            path = X_RAPID_PATH_INSTAGRAM
            break
        case "threads":
            host = X_RAPID_HOST_THREADS
            path = X_RAPID_PATH_THREADS
            break
        default:
            throw new Error('Social media not found')
    }
    const response = await axios.get(`https://${host}${path}`, {
        headers: {
            'x-rapidapi-key': X_RAPID_API_KEY,
            'x-rapidapi-host': host
        }
    })
    return response.data
}

module.exports = fetchRapidAPI