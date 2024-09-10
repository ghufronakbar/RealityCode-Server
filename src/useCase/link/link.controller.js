const { getAllLinkService, createLinkService, deleteLinkService } = require('./link.service');

const getLinkController = async (req, res) => {
    try {
        const link = await getAllLinkService();
        res.status(200).json({ status: 200, message: 'Data Link', data: link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}
const createLinkController = async (req, res) => {
    const { title, desc, url, icon } = req.body;
    try {
        if (!title || !desc || !url || !icon) {
            return res.status(400).json({ status: 400, message: 'All fields must be filled' });
        }
        const link = await createLinkService(title, desc, url, icon);
        res.status(200).json({ status: 200, message: 'Create link success', data: link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

const deleteLinkController = async (req, res) => {
    const id = Number(req.params.id);
    try {
        if(isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' });
        }
        const link = await deleteLinkService(id);
        if (link instanceof Error) {
            return res.status(400).json({ status: 400, message: link.message });
        }
        res.status(200).json({ status: 200, message: 'Delete link success', data: link });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
}

module.exports = { getLinkController, createLinkController, deleteLinkController }