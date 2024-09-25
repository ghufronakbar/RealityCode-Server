const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function backupDatabase() {
  try {

    const admins = await prisma.admin.findMany();
    const links = await prisma.link.findMany();
    const messages = await prisma.message.findMany();
    const posts = await prisma.post.findMany({
      include: { images: true, subsection: { include: { posts: true } } }
    });

    const backupData = {
      admins,
      links,
      messages,
      posts,
    };

    const backupFilePath = path.join(__dirname, `backup_${new Date().toISOString().replace(/:/g, '-')}.json`);

    fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2));

    console.log(`Backup berhasil disimpan ke: ${backupFilePath}`);
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan backup:", error);
  } finally {
    await prisma.$disconnect();
  }
}

backupDatabase();
