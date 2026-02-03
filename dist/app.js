"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// our mvc file imports
const moviesRoutes_1 = __importDefault(require("./routes/moviesRoutes"));
// create & run new express app
const app = (0, express_1.default)();
// express app config
app.use(body_parser_1.default.json()); // parse request body as json
// mongodb connection
mongoose_1.default.connect(process.env.DB, {})
    .then((response) => console.log('Connected to MongoDB'))
    .catch((error) => console.log(`Connection Failed: ${error}`));
app.listen(4000, () => { console.log(`Express API running on port 4000`); });
// api routing
app.use('/api/v1/movies', moviesRoutes_1.default);
