const { getAllPostService, getPostByIdService, deletePostService, createPostService, deletePostImageService, updatePostService } = require('./post.service');

const getAllPostController = async (req, res) => {
    const posts = await getAllPostService()
    try {
        return res.status(200).json({ status: 200, message: 'Get all post success', data: posts })
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
    const { title, content } = req.body
    const images = req.files    
    try {
        if (!title || !content) {
            return res.status(400).json({ status: 400, message: 'All fields must be filled' })
        }                
        const post = await createPostService(title, content, images)
        if(post instanceof Error) {
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

module.exports = { getAllPostController, getPostByIdController, deletePostController, createPostController, deletePostImageController, updatePostController }