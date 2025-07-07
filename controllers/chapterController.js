const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const getImagesByChapterId = async (req, res) => {
  const chapterId = parseInt(req.params.id);

  try {
    const images = await prisma.image.findMany({
      where: { chapterid: chapterId },
      orderBy: { id: "asc" },
      select: {
        id: true,
        url: true,
      },
    });

    res.json(images);
  } catch (error) {
    console.error("❌ Failed to fetch images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

const getChaptersByMangaId = async (req, res) => {
  try {
    const { mangaid } = req.params;
    const chapters = await prisma.chapter.findMany({
      where: { mangaid: parseInt(mangaid) },
      orderBy: { id: "asc" },
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
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
};

const getChaptersWithImagesByMangaId = async (req, res) => {
  console.log("🔥 HIT /api/chapter/manga/:mangaid/full");

  const mangaId = parseInt(req.params.mangaid);

  if (isNaN(mangaId)) {
    return res.status(400).json({ error: "Invalid manga ID" });
  }

  try {
    const chapters = await prisma.chapter.findMany({
      where: { mangaid: mangaId },
      orderBy: { id: "asc" },
      select: {
        id: true,
        title: true,
        images: {
          select: {
            id: true,
            url: true,
          },
          orderBy: { id: "asc" },
        },
      },
    });

    res.json(chapters);
  } catch (err) {
    console.error("❌ Failed to load full chapters:", err);
    res.status(500).json({ error: "Failed to load full chapters" });
  }
};

module.exports = {
  getImagesByChapterId,
  getChaptersByMangaId,
  getChaptersWithImagesByMangaId,
};
