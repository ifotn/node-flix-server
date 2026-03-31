import express, { Router } from 'express';

import { getMovies, createMovie, updateMovie, deleteMovie, createReview, getMovie } from '../controllers/moviesController';
import { verifyToken } from '../middleware/auth';

// create router to point each url to controller function it should call
const router: Router = express.Router();

// public methods
// GET: /api/v1/movies
router.get('/', getMovies);

// GET: /api/v1/movies/{id} => fetch selected movie by id url param
router.get('/:id', getMovie);

// private methods requiring jwt
// POST: /api/v1/movies
router.post('/', verifyToken, createMovie);

// PUT: /api/v1/movies/3489 => : represents a url param (usually an id val)
router.put('/:id', verifyToken, updateMovie);

// DELETE: /api/v1/movies/3489 => : represents a url param (usually an id val)
router.delete('/:id', verifyToken, deleteMovie);

// POST: /api/v1/movies/{id}/reviews
router.post('/:id/reviews', verifyToken, createReview);

// make router public
export default router;