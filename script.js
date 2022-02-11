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
                                    <div class="card" style="width: 18rem;">
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
                                            <button id="${movies[i].id}" data-target="#editModal" data-toggle="modal" class="edit-movie btn btn-primary">Edit</button>
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

$('#addMovie').click(function () {
    addMovie()
})

$(document).on('click', '.delete-movie', function () {
    let movieId = $(this).attr('id')
    fetch(`https://rocky-enchanting-wineberry.glitch.me/movies/${movieId}`, {method: 'DELETE'})
})

$(document).on('click', '.edit-movie', function () {
    let editId = $(this).attr('id')
    fetch(`https://rocky-enchanting-wineberry.glitch.me/movies/${editId}`)
        .then(res => res.json())
        .then(function (movies) {
            console.log(movies)
            $('#edit-box').empty()
            let editData =
            `<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Movie</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div class="modal-body">
                            <div class="input-group input-group-sm mx-2 my-3 user-add-input">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Title:</span>
                                </div>
                                <input type="text" class="form-control" id="edit-title" value="${movies.title}">
                            </div>
                            <div class="input-group input-group-sm mx-2 my-3 user-add-input">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Rating:</span>
                                </div>
                                <input type="text" class="form-control" id="edit-rating" value="${movies.rating}">
                            </div>
                            <div class="input-group input-group-sm mx-2 my-3 user-add-input">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Plot:</span>
                                </div>
                                <textarea class="form-control" id="edit-plot" rows="5">${movies.plot}</textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
            $("#edit-box").append(editData)
        })
})












