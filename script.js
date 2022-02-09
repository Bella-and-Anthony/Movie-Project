"use strict";

// GETTING MOVIES AFTER LOADING
fetch("https://rocky-enchanting-wineberry.glitch.me/movies")
    .then(res => res.json())
    // .then(movies => console.log(movies))
    .then(function(movies) {
        console.log(movies)
            for(let i = 0; i <= movies.length; i++) {
                let movieData =
                    `<div>${movies[i].title}</div>`
                $("#displayMovies").append(movieData)
            }
    })