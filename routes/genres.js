const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    genre: String,
    name: String,
    movies: [
        {
            name: String,
            year: Number,
        },
    ],
});

const GenreModel = mongoose.model('Genre', genreSchema);

async function createNewGenre(genre, movie, year) {
    const gen = new GenreModel({
        name: genre,
        movies: {
            name: movie,
            year,
        },
    });
    gen.save();
}

async function findGenre(genre) {
    const found = await GenreModel.find({
        name: genre,
    }).select('name movies');
    return found;
}

router.get('/', async (req, res) => {
    const allGenres = await GenreModel.find();
    res.send(allGenres);
});

router.get('/:genreName', async (req, res) => {
    const data = await findGenre(req.params.genreName);
    console.log(data);
    res.send(data);
});

router.post('/', (req, res) => {
    const { genre, movieName, movieYear } = req.body;

    const newGenre = createNewGenre(genre, movieName, movieYear);

    res.send(newGenre);
});

module.exports = router;
