// controllers/readerController.js
const getAllImagesByMangaId = async (req, res) => {
  const mangaId = parseInt(req.params.mangaid);

  try {
    const chapters = await prisma.chapter.findMany({
      where: { mangaid: mangaId },
      orderBy: { id: 'asc' },
      include: {
        images: {
          orderBy: { id: 'asc' },
          select: { url: true },
        },
      },
    });

    const data = chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      images: chapter.images.map((img) => img.url),
    }));

    res.json(data);
  } catch (err) {
    console.error("❌ Failed to fetch manga reader data:", err);
    res.status(500).json({ error: "Failed to load chapters" });
  }
};

module.exports = {
  getAllImagesByMangaId,
};
