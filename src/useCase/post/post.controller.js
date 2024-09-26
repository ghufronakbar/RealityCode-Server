const { getAllPostService, getPostByIdService, deletePostService, createPostService, deletePostImageService, updatePostService, createPostImageService, getFavoritedPostsService } = require('./post.service');

const getAllPostController = async (req, res) => {
    const limit = Number(req.query.limit) || 5
    const search = req.query.search || ''
    const subSectionId = Number(req.query.subSectionId)
    try {
        if (isNaN(limit)) {
            return res.status(400).json({ status: 400, message: 'Limit must be a number' })
        }
        if (isNaN(subSectionId)) {
            return res.status(400).json({ status: 400, message: 'Sub section ID must be a number' })
        }
        const posts = await getAllPostService(limit, search, subSectionId)
        return res.status(200).json({ status: 200, message: 'Get all post success', data: posts.posts, limitation: posts.limitation })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const getPostByIdController = async (req, res) => {
    const id = Number(req.params.id)
    try {
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        const post = await getPostByIdService(id)
        if (post instanceof Error) {
            return res.status(400).json({ status: 400, message: post.message })
        }
        return res.status(200).json({ status: 200, message: 'Get post success', data: post })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const deletePostController = async (req, res) => {
    const id = Number(req.params.id)
    try {
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        const post = await deletePostService(id)
        if (post instanceof Error) {
            return res.status(400).json({ status: 400, message: post.message })
        }
        return res.status(200).json({ status: 200, message: 'Delete post success', data: post })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const createPostController = async (req, res) => {
    const { title, content, subSectionId } = req.body
    const images = req.files
    try {
        if (!title || !content) {
            return res.status(400).json({ status: 400, message: 'All fields must be filled' })
        }
        const post = await createPostService(title, content, images, subSectionId)
        if (post instanceof Error) {
            return res.status(400).json({ status: 400, message: post.message })
        }
        return res.status(200).json({ status: 200, message: 'Create post success', data: post })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const deletePostImageController = async (req, res) => {
    const id = Number(req.params.id)
    try {
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        const post = await deletePostImageService(id)
        if (post instanceof Error) {
            return res.status(400).json({ status: 400, message: post.message })
        }
        return res.status(200).json({ status: 200, message: 'Delete post image success', data: post })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const updatePostController = async (req, res) => {
    const id = Number(req.params.id)
    const { title, content } = req.body
    try {
        if (!title || !content) {
            return res.status(400).json({ status: 400, message: 'All fields must be filled' })
        }
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        const post = await updatePostService(id, title, content)
        if (post instanceof Error) {
            return res.status(400).json({ status: 400, message: post.message })
        }
        return res.status(200).json({ status: 200, message: 'Update post success', data: post })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const createPostImageController = async (req, res) => {
    const id = Number(req.params.id)
    const images = req.files
    try {
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID must be a number' })
        }
        const post = await createPostImageService(id, images)
        if (post instanceof Error) {
            return res.status(400).json({ status: 400, message: post.message })
        }
        return res.status(200).json({ status: 200, message: 'Create post image success', data: post })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

const getFavoritedPostsController = async (req, res) => {
    const favorited = req.query.favorited || []
    try {
        const posts = await getFavoritedPostsService(favorited)
        if (posts instanceof Error) {
            return res.status(400).json({ status: 400, message: posts.message })
        }
        return res.status(200).json({ status: 200, message: 'Get favorited posts success', data: posts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Internal Server Error' })
    }
}

module.exports = { getAllPostController, getPostByIdController, deletePostController, createPostController, deletePostImageController, updatePostController, createPostImageController, getFavoritedPostsController }