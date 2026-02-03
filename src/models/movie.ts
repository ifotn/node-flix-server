import mongoose, { Schema } from 'mongoose';

interface IMovie {
    title: string;
    year: number;
    genre: string;
    rating: number;
    duration: number;
}

const MovieSchema = new Schema<IMovie>({
    title: {
        type: String,
        required: [true, 'Title Required']
    },
    year: {
        type: Number,
        min: 1900,
        required: [true, 'Year Required']
    },
    genre: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    duration: {
        type: Number,
        min: 1
    }
});

// make model public. As it's a mongoose model it inherits the mongoose CRUD methods
const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
export default Movie;