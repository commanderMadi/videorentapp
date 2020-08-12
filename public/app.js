const movieGenreInput = document.getElementById('movie_genre');
const movieNameInput = document.getElementById('movie_name');
const movieYearInput = document.getElementById('movie_year');
const genreSearchInput = document.getElementById('genre_search');
const searchResultsDiv = document.getElementById('genre_search_results');

async function postData(url, data) {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', //
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
    });
    return response.json();
}

document.getElementById('addmovie').addEventListener('submit', (e) => {
    e.preventDefault();
    postData('/genres', {
        genre: movieGenreInput.value,
        movieName: movieNameInput.value,
        movieYear: movieYearInput.value,
    });
});

document.getElementById('searchgenre').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = await fetch(`/genres/${genreSearchInput.value}`);
    try {
        const results = await data.json();
        const { movies } = results[0];
        for (let movie of movies) {
            const newMovieDiv = document.createElement('div');
            const newYearDiv = document.createElement('div');

            newMovieDiv.textContent = movie.name;
            newYearDiv.textContent = movie.year;

            searchResultsDiv.appendChild(newMovieDiv);
            searchResultsDiv.appendChild(newYearDiv);
        }
    } catch (err) {
        console.log(err);
    }
});
