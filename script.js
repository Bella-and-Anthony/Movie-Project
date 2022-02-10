"use strict";

// GETTING MOVIES AFTER LOADING
const loadingPromise = new Promise ((resolve) => {
    setTimeout(() => {
        resolve();
        $("#spinner").addClass("loading")
    }, 2000)
});
function movieDisplay() {
    fetch("https://rocky-enchanting-wineberry.glitch.me/movies")
        .then(res => res.json())
        .then(function(movies) {
            console.log(movies)
            for(let i = 0; i <= movies.length -1; i++) {
                let movieData =` <div class="col-4" >
                                    <div class="card" style="width: 18rem;">
                                        <img class="poster" src="${movies[i].poster}" alt="">
                                        <div class="card-body">
                                            <div class="card-title">${movies[i].title}</div>
                                            <div></div>
                                            <div class="card=text">${movies[i].plot}</div>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">${movies[i].actors}</li>
                                            <li class="list-group-item">${movies[i].director}</li>
                                            <li class="list-group-item">${movies[i].genre}</li>
                                            <li class="list-group-item">${movies[i].rating}</li>
                                        </ul>
                                        <div class="card-body">
                                            <button class="btn btn-primary delete-movie" id="${movies[i].id}">Delete</button>
                                            <a class="btn btn-primary" href=""></a>
                                        </div>
                                    </div>
                                </div>`
                $("#displayMovies").append(movieData)
            }
        })
}
loadingPromise.then(() => movieDisplay())

function addMovie() {
    const newMovie = {
        title: $('#title-input').val(),
        rating: $('#rating-input').val()
    };
    const url = 'https://rocky-enchanting-wineberry.glitch.me/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    };
    fetch(url, options)
        .then(response => console.log(response))
        .then(error => console.log(error))
}

$('#addMovie').click(function(){
    addMovie()
})

$(document).on('click', '.delete-movie', function(){
    let movieId = $(this).attr('id')
    fetch(`https://rocky-enchanting-wineberry.glitch.me/movies/${movieId}`, {method: 'DELETE'})
})














