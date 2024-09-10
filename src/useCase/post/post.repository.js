const prisma = require('../../db/prisma')

const getAllPost = async () => {
    const posts = await prisma.post.findMany({
        include: {
            _count: {
                select: {
                    images: true
                }
            },
            images: true
        }
    })
    return posts
}

const getPostById = async (id) => {
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    images: true
                }
            },
            images: true
        }
    })
    return post
}

const deletePost = async (id) => {
    const post = await prisma.post.delete({
        where: {
            id
        }
    })
    return post
}

const createPost = async (title, content, images) => {
    const post = await prisma.post.create({
        data: {
            title,
            content,
            images: {
                createMany: {
                    data: images
                }
            }
        },
        include: {
            _count: {
                select: {
                    images: true
                }
            },
            images: true
        }
    })
    return post
}

const getPostImageById = async (id) => {
    const image = await prisma.image.findUnique({
        where: {
            id
        }
    })
    return image
}

const deletePostImage = async (id) => {
    const post = await prisma.image.delete({
        where: {
            id
        }
    })
    return post
}

const updatePost = async (id, title, content) => {
    const post = await prisma.post.update({
        where: {
            id
        },
        data: {
            title,
            content
        }
    })
    return post
}

module.exports = { getAllPost, getPostById, deletePost, createPost, deletePostImage, updatePost, getPostImageById }