const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const getImagesByChapterId = async (req, res) => {
  const chapterId = parseInt(req.params.id);

  try {
    const images = await prisma.image.findMany({
      where: { chapterid: chapterId },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        url: true,
      },
    });

    res.json(images);
  } catch (error) {
    console.error("❌ Failed to fetch images:", error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

module.exports = {
  getImagesByChapterId,
};
