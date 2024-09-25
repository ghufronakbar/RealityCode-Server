const { getAllPost, getPostById, deletePost, createPost, deletePostImage, updatePost, getPostImageById, countAllPost, createPostImages, getFavoritedPosts } = require("./post.repository")
const isValidImageArray = require('../../utils/isValidImageArray')
const removeCloudinary = require("../../utils/removeCloudinary")
const isValidIds = require('../../utils/isValidIds')

const getAllPostService = async (limit, search) => {
    const posts = await getAllPost(limit, search)
    const count = await countAllPost(search)
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

const createPostService = async (title, content, images, subsectionId) => {
    const numSubSec = Number(subsectionId)
    if (isNaN(numSubSec)) {
        return new Error('Subsection ID must be a number')
    }    
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
    const post = await createPost(title, content, imagesData, numSubSec)
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

const createPostImageService = async (id, images) => {
    const post = await getPostById(id)
    if (!post) {
        return new Error('Post not found')
    }
    if (!images) {
        return new Error('Image cannot be empty')
    }
    let imagesData = []
    for (const i of images) {
        imagesData.push({ url: i.path })
    }
    const isValidImage = isValidImageArray(imagesData)
    if (!isValidImage) {
        return new Error('Invalid image format')
    }
    if (imagesData.length === 0) {
        return new Error('Image cannot be empty')
    }
    const created = await createPostImages(id, imagesData)
    return created
}

const getFavoritedPostsService = async (objectOfIds) => {
    let parseJson = []
    try {
        parseJson = JSON.parse(objectOfIds)
        const check = isValidIds(parseJson)
        if (!check) {
            return []
        }
    } catch (error) {
        return []
    }
    const posts = await getFavoritedPosts(parseJson)
    return posts
}

module.exports = { getAllPostService, getPostByIdService, deletePostService, createPostService, deletePostImageService, updatePostService, createPostImageService, getFavoritedPostsService }