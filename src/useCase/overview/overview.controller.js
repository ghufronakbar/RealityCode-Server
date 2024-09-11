const { getOverviewService } = require('./overview.service');

const getOverviewController = async (req, res) => {
    const overview = await getOverviewService();
    try {
        return res.status(200).json({ status: 200, message: 'Get overview success', data: overview });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

module.exports = { getOverviewController }