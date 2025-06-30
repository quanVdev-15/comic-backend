const express = require('express');
const router = express.Router();
const { getMangaList, getChaptersByMangaId } = require('../controllers/mangaController');

// GET /api/manga?page=1&limit=10
router.get('/', getMangaList);

// GET /api/manga/:id/chapters?page=1&limit=10
router.get('/:id/chapters', getChaptersByMangaId);


router.get('/chapters/:id/images', async (req, res) => {
  const chapterId = parseInt(req.params.id);
  if (!chapterId) return res.status(400).json({ message: 'Invalid chapter ID' });

  try {
    const prisma = require('../generated/prisma').PrismaClient;
    const db = new prisma();

    const images = await db.image.findMany({
      where: { chapterid: chapterId },
      select: { url: true },
      orderBy: { id: 'asc' },
    });

    res.json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

module.exports = router;
