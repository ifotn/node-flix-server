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
/**
* @swagger
* /api/v1/movies:
*   get:
*     summary: Retrieve all movies
*     responses:
*       200:
*         description: A list of movies
*/
const getMovies = async (req, res) => {
    // use model to fetch all movie documents from MongoDB
    const movies = await movie_1.default.find();
    return res.status(200).json(movies);
};
exports.getMovies = getMovies;
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
const createMovie = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ 'error': 'Bad Request' }); // 400: Bad Request
    }
    // use Movie model to save to db
    await movie_1.default.create(req.body);
    return res.status(201).json(); // 201: Resource Created
};
exports.createMovie = createMovie;
/**
* @swagger
* /api/v1/movies/{id}:
*   put:
*     summary: Update a movie based on id param in url
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
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
*       204:
*         description: Updated, no content
*       404:
*         description: Movie not found
*/
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
/**
* @swagger
* /api/v1/movies/{id}:
*   delete:
*     summary: Delete a movie based on id param in url
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*     responses:
*       204:
*         description: Deleted, no content
*       404:
*         description: Movie not found
*/
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
