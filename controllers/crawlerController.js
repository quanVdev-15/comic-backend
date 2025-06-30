const axios = require("axios");
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const crawlManga = async (req, res) => {
  try {
    const mangaId = 91;

    // 👇 Check if manga already exists in DB
    let manga = await prisma.manga.findUnique({ where: { id: mangaId } });

    if (!manga) {
      // 👇 Create manga if not found
      manga = await prisma.manga.create({
        data: {
          id: mangaId, // use fixed ID to match chapters
          title: "Solo Leveling", // update if needed
          description: "Auto-crawled from external source",
          author: "Unknown", // update if you know
          createdby: "crawler",
          updatedby_: "crawler",
        },
      });
    }

    // 👇 Get chapters
    const chapterRes = await axios.get(
      `https://manga-crawler-api-iota.vercel.app/manga/${mangaId}/chapters?all=true`
    );

    const chapters = chapterRes.data.chapters;

    for (const chapter of chapters) {
      // 👇 Get images for chapter
      const imageRes = await axios.get(
        `https://manga-crawler-api-iota.vercel.app/chapter/${chapter.id}/images`
      );

      const images = imageRes.data.images;

      // 👇 Create chapter
      const createdChapter = await prisma.chapter.create({
        data: {
          id:chapter.id,
          mangaid: manga.id,
          title: `Chapter ${chapter.chapternumber}`,
          url: chapter.url || null,
          pages: images.length,
          createdby: "crawler",
          updatedby: "crawler",
        },
      });

      // 👇 Create images
      for (const image of images) {
        await prisma.image.create({
          data: {
            chapterid: createdChapter.id,
            url: `https://dilib.vn${image.url}`,
            createdby: "crawler",
            updatedby: "crawler",
          },
        });
      }
    }

    res.status(200).json({ message: "✅ Crawling complete!" });
  } catch (err) {
    console.error("❌ Crawling failed:", err.message);
    res.status(500).json({ message: "Error crawling manga", error: err.message });
  }
};

module.exports = {
  crawlManga,
};
