const express = require('express');

const router = express.Router();
const filmController = require('../controllers/film');
const { validationPostFilm, validationEditFilm, runValidation } = require('../validation');

router.get('/', filmController.retrieveAllFilm);

router.get('/:id', filmController.retriveFilmById)

router.post('/', validationPostFilm, runValidation, filmController.createFilm);

router.put('/:id',validationEditFilm, runValidation, filmController.updateFilm);

router.delete('/:id', filmController.deleteFilm )

module.exports = router;