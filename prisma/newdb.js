const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const backupdata = require('./backup_2024-09-25T06-54-47.516Z.json');

// Fungsi untuk menghapus field 'id' dari setiap gambar
function removeImageIds(postsData) {
    return postsData.map(post => {
        const { images, ...rest } = post;
        const cleanImages = images.map(image => {
            const { id, ...imageRest } = image;  // Menghapus 'id' dari image
            return imageRest;
        });
        return {
            ...rest,
            images: cleanImages
        };
    });
}

async function newdb() {
    try {
        await prisma.$connect();

        const cleanPostsData = removeImageIds(backupdata.posts);

        for (const post of cleanPostsData) {
            // Cek apakah subsectionId valid sebelum membuat post
            const subsection = await prisma.subSection.findUnique({
                where: { id: post.subsectionId }
            });

            if (!subsection) {
                console.log(`Subsection with id ${post.subsectionId} not found, skipping post`);
                continue;  // Skip this post if subsectionId is invalid
            }

            // Buat post jika subsectionId valid
            const createdPost = await prisma.post.create({
                data: {
                    title: post.title,
                    content: post.content,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                    subsectionId: post.subsectionId
                }
            });

            // Buat gambar yang terkait dengan post
            if (post.images.length > 0) {
                await prisma.image.createMany({
                    data: post.images.map(image => ({
                        url: image.url,
                        createdAt: image.createdAt,
                        updatedAt: image.updatedAt,
                        postId: createdPost.id  // Hubungkan gambar dengan post yang baru saja dibuat
                    }))
                });
            }
        }

        console.log("Seeded successfully");
    } catch (error) {
        console.log("Seeding failed");
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

newdb();
