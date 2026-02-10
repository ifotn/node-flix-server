import express, { Request, Response } from 'express';

// Movie Model ref
import Movie from '../models/movie';

// // define a movie object
// interface Movie {
//     id: number;
//     title: string;
//     year: number;
// }

// // create mock movie data in memory 
// let movies: Movie[] = [
//     { id: 1, title: 'The Shining', year: 1980 },
//     { id: 2, title: 'Weapons', year: 2025 },
//     { id: 3, title: '28 Years Later', year: 2025 },
//     { id: 4, title: 'Deadpool & Wolverine', year: 2024 }
// ];

/**
* @swagger
* /api/v1/movies:
*   get:
*     summary: Retrieve all movies
*     responses:
*       200:
*         description: A list of movies
*/
export const getMovies = async (req: Request, res: Response) => {
    // use model to fetch all movie documents from MongoDB
    const movies = await Movie.find();
    return res.status(200).json(movies);
}

/**
* @swagger
* /api/v1/movies:
*   post:
*     summary: Create a new movie
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 required: true
*                 type: string
*               year:
*                 required: true
*                 type: number
*     responses:
*       201:
*         description: Movie created
*       400:
*         description: Bad request
*/
export const createMovie = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request' }); // 400: Bad Request
    }

    // use Movie model to save to db
    await Movie.create(req.body);

    return res.status(201).json(); // 201: Resource Created
}

// PUT: update movie using id param in url (e.g. /api/v1/movies/3489)
export const updateMovie = async (req: Request, res: Response) => {
    // check if id valid
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return res.status(404).json({ 'error': 'Movie Not Found' });
    }

    // use mongoose to update Movie from request body
    await Movie.findByIdAndUpdate(req.params.id, req.body);

    return res.status(204).json(); // 204: OK, No Content
};

// DELETE: remove movie from array using id param in url (eg. /api/v1/movies/3489)
export const deleteMovie = async (req: Request, res: Response) => {
    // check if id valid
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return res.status(404).json({ 'error': 'Movie Not Found' });
    }

    // use mongoose to delete movie based on id param in url
    await Movie.findByIdAndDelete(req.params.id);

    return res.status(204).json(); // 204: OK, No Content
};