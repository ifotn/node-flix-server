"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.createMovie = exports.getMovies = void 0;
// create mock movie data in memory 
let movies = [
    { id: 1, title: 'The Shining', year: 1980 },
    { id: 2, title: 'Weapons', year: 2025 },
    { id: 3, title: '28 Years Later', year: 2025 },
    { id: 4, title: 'Deadpool & Wolverine', year: 2024 }
];
// GET: fetch all movies
const getMovies = (req, res) => {
    return res.status(200).json(movies);
};
exports.getMovies = getMovies;
// POST: create new movie from request body
const createMovie = (req, res) => {
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request' }); // 400: Bad Request
    }
    // add new movie to array from request body
    movies.push(req.body);
    return res.status(201).json(); // 201: Resource Created
};
exports.createMovie = createMovie;
// PUT: update movie using id param in url (e.g. /api/v1/movies/3489)
const updateMovie = (req, res) => {
    // find movie in array by id
    const index = movies.findIndex(m => m.id. == req.params.id);
    if (index === -1) {
        return res.status(404).json({ 'error': 'Not Found' });
    }
    // update element in array w/vals from request body
    movies[index].title = req.body.title;
    movies[index].year = req.body.year;
    return res.status(204).json(); // 204: OK, No Content
};
exports.updateMovie = updateMovie;
