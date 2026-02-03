"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovies = void 0;
// Movie Model ref
const movie_1 = __importDefault(require("../models/movie"));
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
// GET: fetch all movies
const getMovies = async (req, res) => {
    // use model to fetch all movie documents from MongoDB
    const movies = await movie_1.default.find();
    return res.status(200).json(movies);
};
exports.getMovies = getMovies;
// POST: create new movie from request body
const createMovie = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request' }); // 400: Bad Request
    }
    // use Movie model to save to db
    await movie_1.default.create(req.body);
    return res.status(201).json(); // 201: Resource Created
};
exports.createMovie = createMovie;
// PUT: update movie using id param in url (e.g. /api/v1/movies/3489)
const updateMovie = async (req, res) => {
    // check if id valid
    const movie = await movie_1.default.findById(req.params.id);
    if (!movie) {
        return res.status(404).json({ 'error': 'Movie Not Found' });
    }
    // use mongoose to update Movie from request body
    await movie_1.default.findByIdAndUpdate(req.params.id, req.body);
    return res.status(204).json(); // 204: OK, No Content
};
exports.updateMovie = updateMovie;
// DELETE: remove movie from array using id param in url (eg. /api/v1/movies/3489)
const deleteMovie = async (req, res) => {
    // check if id valid
    const movie = await movie_1.default.findById(req.params.id);
    if (!movie) {
        return res.status(404).json({ 'error': 'Movie Not Found' });
    }
    // use mongoose to delete movie based on id param in url
    await movie_1.default.findByIdAndDelete(req.params.id);
    return res.status(204).json(); // 204: OK, No Content
};
exports.deleteMovie = deleteMovie;
