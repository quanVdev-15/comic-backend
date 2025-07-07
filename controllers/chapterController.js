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


const getChaptersByMangaId = async (req, res) => {
  try{
    const {mangaid} = req.params;
    const chapters = await prisma.chapter.findMany({
      where: { mangaid: parseInt(mangaid) },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        title: true,
        number: true,
        createdAt: true,
      },
    });
    res.json(chapters);
  } catch (error) {
    console.error("❌ Failed to fetch chapters:", error);
    res.status(500).json({ error: 'Failed to fetch chapters' });
  }
};
module.exports = {
  getImagesByChapterId,
  getChaptersByMangaId, 
};
