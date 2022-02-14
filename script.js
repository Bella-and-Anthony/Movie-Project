"use strict";

// GETTING MOVIES AFTER LOADING
const loadingPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve();
        $("#spinner").addClass("loading")
    }, 2000)
});

function movieDisplay() {
    fetch("https://rocky-enchanting-wineberry.glitch.me/movies")
        .then(res => res.json())
        .then(function (movies) {
            console.log(movies)
            for (let i = 0; i <= movies.length - 1; i++) {
                let movieData = ` <div class="col-4" >
                                    <div class="card" style="width: 18rem;" id="card-shadow">
                                        <img class="poster" src="${movies[i].poster}" alt="movie poster">
                                        <div class="card-body">
                                            <h5 class="card-title">${movies[i].title}</h5>
                                            <div></div>
                                            <div class="card=text">${movies[i].year}</div>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"><h6>Actors:</h6> ${movies[i].actors}</li>
                                            <li class="list-group-item"><h6>Directors:</h6> ${movies[i].director}</li>
                                            <li class="list-group-item"><h6>Genre:</h6> ${movies[i].genre}</li>
                                            <li class="list-group-item"><h6>Rating:</h6> ${movies[i].rating}</li>
                                        </ul>
                                        <div class="card-body">
                                            <button class="btn btn-primary delete-movie" id="${movies[i].id}">Delete</button>
                                            <button id="movie${movies[i].id}" data-target="#editModal" data-toggle="modal" class="edit-movie btn btn-primary">Edit</button>
                                        </div>
                                    </div>`
                $("#displayMovies").append(movieData)
                $(`#movie${movies[i].id}`).click(function(){
                    $('#input-title').attr('value', `${movies[i].title}`)
                    $('#input-rating').attr('value', `${movies[i].rating}`)
                    $('#input-plot').html(`${movies[i].plot}`)
                })
            }
        })
}

loadingPromise.then(() => movieDisplay())


// CREATING ADD MOVIE FUNCTION
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

// CREATING EDIT MOVIE FUNCTION
    $(document).on('click','.edit-movie',function(){
        let editId = $(this).attr('id').split('movie')[1]
        console.log(editId)
        $(document).on('click', '.save-edit', function(){
            console.log('clicked')
            fetch(`https://rocky-enchanting-wineberry.glitch.me/movies/${editId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: $('#input-title').val(),
                    rating: $('#input-rating').val(),
                    plot: $('#input-plot').val(),
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then(response => response.json)
        })
    })

// EVENT LISTENER FOR ADD MOVIE
$('#addMovie').click(function () {
    addMovie()
})

// EVENT LISTENER FOR EDIT MOVIE
$(document).on('click', '.delete-movie', function () {
    let movieId = $(this).attr('id')
    fetch(`https://rocky-enchanting-wineberry.glitch.me/movies/${movieId}`, {method: 'DELETE'})
})










