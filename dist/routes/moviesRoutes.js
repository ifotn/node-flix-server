"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moviesController_1 = require("../controllers/moviesController");
const auth_1 = require("../middleware/auth");
// create router to point each url to controller function it should call
const router = express_1.default.Router();
// public methods
// GET: /api/v1/movies
router.get('/', moviesController_1.getMovies);
// GET: /api/v1/movies/{id} => fetch selected movie by id url param
router.get('/:id', moviesController_1.getMovie);
// private methods requiring jwt
// POST: /api/v1/movies
router.post('/', auth_1.verifyToken, moviesController_1.createMovie);
// PUT: /api/v1/movies/3489 => : represents a url param (usually an id val)
router.put('/:id', auth_1.verifyToken, moviesController_1.updateMovie);
// DELETE: /api/v1/movies/3489 => : represents a url param (usually an id val)
router.delete('/:id', auth_1.verifyToken, moviesController_1.deleteMovie);
// POST: /api/v1/movies/{id}/reviews
router.post('/:id/reviews', auth_1.verifyToken, moviesController_1.createReview);
// make router public
exports.default = router;
