const prisma = require('../../db/prisma')

const getAllPost = async (limit, search, subSectionId) => {
    const posts = await prisma.post.findMany({
        include: {
            _count: {
                select: {
                    images: true
                }
            },
            images: true,
            subsection: true
        },
        take: limit,
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            AND: [
                {
                    subsectionId: subSectionId
                },
                {
                    OR: [
                        {
                            title: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        },
                    ]
                }
            ]
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
                },
            },
            images: true,
            subsection: true
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

const createPost = async (title, content, images, subsectionId) => {
    const post = await prisma.post.create({
        data: {
            title,
            content,
            subsectionId,
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

const countAllPost = async (search, subSectionId) => {
    const count = await prisma.post.count({
        where: {
            AND: [
                {
                    subsectionId: subSectionId
                },
                {
                    OR: [
                        {
                            title: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        },
                        {
                            content: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        }
                    ]
                }
            ],
        }
    })
    return count
}

const createPostImages = async (id, url) => {
    const image = await prisma.post.update({
        where: {
            id
        },
        data: {
            images: {
                createMany: {
                    data: url
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
    return image
}

const getFavoritedPosts = async (objectOfIds) => {
    const posts = await prisma.post.findMany({
        where: {
            OR: objectOfIds
        },
        orderBy: {
            createdAt: 'desc'
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
    return posts
}

module.exports = { getAllPost, getPostById, deletePost, createPost, deletePostImage, updatePost, getPostImageById, countAllPost, createPostImages, getFavoritedPosts }