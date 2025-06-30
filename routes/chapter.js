const express = require('express')
const router = express.Router();

const {getImagesByChapterId} = require('../controllers/chapterController');



router.get('/:id/images',getImagesByChapterId);

module.exports= router;