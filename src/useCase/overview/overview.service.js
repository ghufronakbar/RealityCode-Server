const fetchRapidAPI = require('../../utils/fetchRapidAPI');

const getOverviewService = async () => {
    const [fetchTiktok, fetchInstagram, fetchThreads] = await Promise.all([fetchRapidAPI('tiktok'), fetchRapidAPI('instagram'), fetchRapidAPI('threads')])
    if (fetchTiktok instanceof Error) return new Error('Tiktok API not found')
    if (fetchInstagram instanceof Error) return new Error('Instagram API not found')
    if (fetchThreads instanceof Error) return new Error('Threads API not found')
        
    const tiktok = {
        followers: fetchTiktok.userInfo.stats.followerCount,
        like: fetchTiktok.userInfo.stats.heartCount,
        post: fetchTiktok.userInfo.stats.videoCount
    }
    const instagram = {
        username: fetchInstagram.data.username,
        followers: fetchInstagram.data.follower_count
    }
    const threads = {
        username: fetchThreads.data.user.username,
        followers: fetchThreads.data.user.follower_count
    }

    return { tiktok, instagram, threads }
}

module.exports = { getOverviewService }