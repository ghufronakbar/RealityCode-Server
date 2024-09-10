const { getAllPost, getPostById, deletePost, createPost, deletePostImage, updatePost, getPostImageById, countAllPost } = require("./post.repository")
const isValidImageArray = require('../../utils/isValidImageArray')
const removeCloudinary = require("../../utils/removeCloudinary")

const getAllPostService = async (limit) => {
    const posts = await getAllPost(limit)
    const count = await countAllPost()
    const limitation = { currentData: posts.length, totalData: count }
    return { posts, limitation }
}

const getPostByIdService = async (id) => {
    const post = await getPostById(id)
    if (!post) {
        return new Error('Post not found')
    }
    return post
}

const deletePostService = async (id) => {
    const post = await getPostById(id)
    if (!post) {
        return new Error('Post not found')
    }
    for (const p of post.images) {
        const removeImage = await removeCloudinary(p.url, "post")
        if (removeImage instanceof Error) {
            return removeImage
        }
    }
    const deleted = await deletePost(id)
    return deleted
}

const createPostService = async (title, content, images) => {
    let imagesData = []
    for (const image of images) {
        imagesData.push({ url: image.path })
    }
    const isValidImage = isValidImageArray(imagesData)
    if (!isValidImage) {
        return new Error('Invalid image format')
    }
    if (imagesData.length === 0) {
        return new Error('Image cannot be empty')
    }
    const post = await createPost(title, content, imagesData)
    return post
}

const deletePostImageService = async (id) => {
    const image = await getPostImageById(id)
    if (!image) {
        return new Error('Image not found')
    }
    const removeImage = await removeCloudinary(image.url, "post")
    if (removeImage instanceof Error) {
        return removeImage
    }
    const deleted = await deletePostImage(id)
    return deleted
}

const updatePostService = async (id, title, content) => {
    const post = await getPostById(id)
    if (!post) {
        return new Error('Post not found')
    }
    const updated = await updatePost(id, title, content)
    return updated
}

module.exports = { getAllPostService, getPostByIdService, deletePostService, createPostService, deletePostImageService, updatePostService }