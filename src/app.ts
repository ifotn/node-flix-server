// npm imports
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// our mvc file imports
import moviesRouter from './routes/moviesRoutes';

// create & run new express app
const app: Application = express();

// express app config
app.use(bodyParser.json());  // parse request body as json

// mongodb connection
mongoose.connect(process.env.DB, {})
.then((response) => console.log('Connected to MongoDB'))
.catch((error) => console.log(`Connection Failed: ${error}`));

app.listen(4000, () => { console.log(`Express API running on port 4000`) });

// api routing
app.use('/api/v1/movies', moviesRouter);