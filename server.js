const express = require('express');

const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/videorentapp', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(console.log('Connected to Mongodb'));

const genresRouter = require('./routes/genres');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/genres', genresRouter);
// app.use('/', homeRouter);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
