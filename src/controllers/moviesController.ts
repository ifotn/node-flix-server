import express, { Request, Response } from 'express';

// define a movie object
interface Movie {
    id: number;
    title: string;
    year: number;
}

// create mock movie data in memory 
let movies: Movie[] = [
    { id: 1, title: 'The Shining', year: 1980 },
    { id: 2, title: 'Weapons', year: 2025 },
    { id: 3, title: '28 Years Later', year: 2025 },
    { id: 4, title: 'Deadpool & Wolverine', year: 2024 }
];

// GET: fetch all movies
export const getMovies = (req: Request, res: Response) => {
    return res.status(200).json(movies);
}

// POST: create new movie from request body
export const createMovie = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request' }); // 400: Bad Request
    }

    // add new movie to array from request body
    movies.push(req.body);

    return res.status(201).json(); // 201: Resource Created
}

// PUT: update movie using id param in url (e.g. /api/v1/movies/3489)
export const updateMovie = (req: Request, res: Response) => {
    // find movie in array by id
    const index: number = movies.findIndex(m => m.id.toString() === req.params.id.toString());

    if (index === -1) {
        return res.status(404).json({ 'error': 'Not Found' });
    }

    // update element in array w/vals from request body
    movies[index].title = req.body.title;
    movies[index].year = req.body.year;
    return res.status(204).json(); // 204: OK, No Content
};