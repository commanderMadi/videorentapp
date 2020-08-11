const genres = [
    {
        id: 1,
        name: 'Action',
        movies: [
            {name: 'Kill Confirmed', 
        year: 2019},
        {name: 'Kill Denied', 
        year: 2020},
        
        ]
    },

    {
        id: 2,
        name: 'Romance',
        movies: [
            {name: 'Beauty and The Beast', 
        year: 2017},
        {name: 'Trousers Down', 
        year: 2018},
        
        ]
    }
];
    
    const express = require('express');

    const app = express();

    app.use(express.json());

    app.get('/genres', (req, res) => {
        res.send(genres);
    })

    app.get('/genres/:id', (req, res) => {
    
        const genre = genres.find(genre => genre.id === parseInt(req.params.id));
     
        if(!genre) {
            return res.status(404).send('The genre id provided is not found.')
        }
        res.send(genre);
    });

    app.post('/genres', (req, res) => {
        console.log(req.body)
        const newGenre = {
            id: genres.length + 1,
            genre: req.body.genre,
            movies: req.body.movies
        }
        genres.push(newGenre);

        res.send(newGenre)
    });

    app.put('/genres/:id', (req, res) => {
        const genre = genres.find(genre => genre.id === parseInt(req.params.id));
     
    

        genre.movies = req.body.movies;

        res.send(genre);
    })

    app.delete('/genres/:id', (req, res) => {
        const genre = genres.find(genre => genre.id === parseInt(req.params.id));
        if(!genre) {
            return res.status(404).send('The genre id provided is not found.')
        }
        const genreToDeleteIndex = genres.indexOf(genre);
        console.log(genreToDeleteIndex);
        const deletedGenre = genres.splice(genreToDeleteIndex, 1);
        res.send(deletedGenre);
    })


    const PORT = process.env.PORT || 5050;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
    