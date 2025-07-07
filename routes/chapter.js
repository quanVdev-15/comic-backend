const express = require('express')
const router = express.Router();

const {getImagesByChapterId,getChaptersByMangaId,getChaptersWithImagesByMangaId} = require('../controllers/chapterController');



router.get('/:id/images',getImagesByChapterId);

router.get('/manga/:mangaid', getChaptersByMangaId);

router.get('/manga/:mangaid/full', getChaptersWithImagesByMangaId);
module.exports= router;