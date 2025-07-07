const express = require('express')
const router = express.Router();

const {getImagesByChapterId,getChaptersByMangaId,getFullChaptersWithImages} = require('../controllers/chapterController');



router.get('/:id/images',getImagesByChapterId);

router.get('/manga/:mangaid', getChaptersByMangaId);

module.exports= router;