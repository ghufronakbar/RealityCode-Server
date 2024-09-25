const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function backupDatabase() {
  try {
    // Query semua data dari setiap model
    const admins = await prisma.admin.findMany();
    const links = await prisma.link.findMany();
    const messages = await prisma.message.findMany();
    const posts = await prisma.post.findMany({
      include: { images: true }  // Include related images in the posts
    });

    // Gabungkan semua data ke dalam satu objek
    const backupData = {
      admins,
      links,
      messages,
      posts,  // images already included in posts
    };

    // Tentukan path dan nama file untuk menyimpan JSON backup
    const backupFilePath = path.join(__dirname, `backup_${new Date().toISOString().replace(/:/g, '-')}.json`);

    // Simpan data sebagai JSON
    fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2));

    console.log(`Backup berhasil disimpan ke: ${backupFilePath}`);
  } catch (error) {
    console.error("Terjadi kesalahan saat melakukan backup:", error);
  } finally {
    await prisma.$disconnect();  // Pastikan koneksi ke database ditutup
  }
}

// Jalankan fungsi backup
backupDatabase();
