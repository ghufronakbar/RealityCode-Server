const { getOverviewService } = require('./overview.service');

const getOverviewController = async (req, res) => {
    try {
        const overview = await getOverviewService();
        if (overview instanceof Error) {
            return res.status(400).json({ status: 400, message: overview.message });
        }
        return res.status(200).json({ status: 200, message: 'Get overview success', data: overview });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

module.exports = { getOverviewController }