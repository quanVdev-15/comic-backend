const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const getMangaList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const keyword = req.query.keyword?.trim() || "";
  const skip = (page - 1) * limit;

  const shouldSearch = keyword.length > 1;

  let whereCondition = {};

  if (shouldSearch) {
    const words = keyword.split(" ").filter(Boolean);
    whereCondition = {
      AND: words.map((word) => ({
        title: {
          contains: word,
          mode: "insensitive", // case-insensitive
        },
      })),
    };
  }

  try {
    const mangas = await prisma.manga.findMany({
      skip,
      take: limit,
      where: whereCondition,
      select: {
        id: true,
        title: true,
        description: true,
        author: true,
        coverImageUrl: true,
        categoryid: true,
        createddate: true,
        createdby: true,
        updateddate_: true,
        updatedby_: true,
      },
      orderBy: { id: "asc" },
    });

    res.json(mangas);
  } catch (err) {
    console.error("Error fetching manga list:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getChaptersByMangaId = async (req, res) => {
  const mangaId = parseInt(req.params.id);
  const isAll = req.query.all === "true";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const chapters = await prisma.chapter.findMany({
      where: { mangaid: mangaId },
      orderBy: { id: "asc" },
      ...(isAll ? {} : { skip, take: limit }),
      select: {
        id: true,
        title: true,
        pages: true,
      },
    });

    res.json(chapters);
  } catch (error) {
    console.error("💥 Error in getChaptersByMangaId:", error);
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
};




module.exports = {
  getMangaList,
  getChaptersByMangaId,
};
