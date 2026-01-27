import express, { Router } from 'express';

import { getMovies, createMovie, updateMovie, deleteMovie } from '../controllers/moviesController';

// create router to point each url to controller function it should call
const router: Router = express.Router();

// GET: /api/v1/movies
router.get('/', getMovies);

// POST: /api/v1/movies
router.post('/', createMovie);

// PUT: /api/v1/movies/3489 => : represents a url param (usually an id val)
router.put('/:id', updateMovie);

// DELETE: /api/v1/movies/3489 => : represents a url param (usually an id val)
router.delete('/:id', deleteMovie);

// make router public
export default router;