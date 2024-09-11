const fetchRapidAPI = require('../../utils/fetchRapidAPI');

const getOverviewService = async () => {
    const [fetchTiktok, fetchInstagram, fetchThreads] = await Promise.all([fetchRapidAPI('tiktok'), fetchRapidAPI('instagram'), fetchRapidAPI('threads')])
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