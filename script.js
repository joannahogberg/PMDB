/*
For this application I have used the Module Design Pattern in combination with the Object prototype constructor. 
I found The Module Pattern easier to use than Revealing Module Pattern. It has a flexibility to bind functions to the module which
is minimazing the risk of having variables being overwritten or the function names conflicting. 
All functions are placed inside of the module and thereby gets boud to the module and I noticed that I prefer writing functions with 
object literal notation. You don't need to use the this keyword wich sometimes can be confusing.

The Object prototype constructor returns a reference to the Object constructor function that created the instance object. I wanted to try 
out on this and find it easy to understand how the new Object gets created using the constructor.
By using this type of constructor I'm setting the new Objects prototype to an instance of the constructor, so that 
new Object inherits all of the properties that the constructor contains.

The function to rate movies is not yet done but I hope to solve it soon.

*/


function init() {

    const movieByGenreBtn = document.getElementById("selectMovies");
    const topMovieBtn = document.getElementById("topMovieBtn");
    const worstMovieBtn = document.getElementById("worstMovieBtn");
    const showAllMovieBtn = document.getElementById("showMovieBtn");
    const addMovieBtn = document.getElementById("addMovieBtn");
    const thisYearMovieBtn = document.getElementById("thisYearMovieBtn");

    /**
     * Eventlistener to apply click/change-functions to buttons
     */
    topMovieBtn.addEventListener("click", MovieDataBase.getTopMovie);
    worstMovieBtn.addEventListener("click", MovieDataBase.getWorstMovie);
    movieByGenreBtn.addEventListener("change", MovieDataBase.showMovByGenre);
    addMovieBtn.addEventListener("click", MovieDataBase.movieAddedByForm);
    showAllMovieBtn.addEventListener("click", MovieDataBase.getAllMovies);
    thisYearMovieBtn.addEventListener("click", MovieDataBase.showMoviesThisYear);
};

/**
 * Load init-function when window opens
 */
window.addEventListener("load", init);

/**
 * MovieDataBase with Module Pattern
 * @return {Object}
 */

const MovieDataBase = (function() {

    /**
     * Array of all movies
     * @type {Array}
     */

    let movies = [{
            title: "La La Land",
            year: 2016,
            genres: ['Musical', 'Comedy', 'Drama'],
            ratings: [3, 5, 4, 3, 5],
            descript: "A jazz pianist falls for an aspiring actress in Los Angeles.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SY1000_SX675_AL_.jpg"
        },
        {
            title: "One Flew Over The Cuckoo’s Nest",
            year: 1975,
            genres: ['Drama'],
            ratings: [5, 5, 5, 4, 5],
            descript: "A criminal pleads insanity after getting into trouble again and once in the mental institution rebels against the oppressive nurse and rallies up the scared patients.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,672,1000_AL_.jpg"
        },
        {
            title: "The Godfather",
            year: 1972,
            genres: ['Drama', 'Crime'],
            ratings: [2, 5, 4, 5, 5, 4],
            descript: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BZTRmNjQ1ZDYtNDgzMy00OGE0LWE4N2YtNTkzNWQ5ZDhlNGJmL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,704,1000_AL_.jpg"
        },
        {
            title: "The Lego Batman Movie",
            year: 2017,
            genres: ['Animation', 'Kids'],
            ratings: [3, 4, 2, 3],
            descript: "Bruce Wayne must not only deal with the criminals of Gotham City, but also the responsibility of raising a boy he adopted.",
            img: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg'
        },
        {
            title: "The Lion King",
            year: 1994,
            genres: ['Animation', 'Kids', 'Drama', 'Adventure'],
            ratings: [4, 4, 3, 5, 3],
            descript: "Lion cub and future king Simba searches for his identity. His eagerness to please others and penchant for testing his boundaries sometimes gets him into trouble.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SY1000_CR0,0,673,1000_AL_.jpg"
        },
        {
            title: "Lion",
            year: 2016,
            genres: ['Drama', 'Romance'],
            ratings: [3, 3, 3, 2],
            descript: "A five-year-old Indian boy gets lost on the streets of Calcutta, thousands of kilometers from home. He survives many challenges before being adopted by a couple in Australia; 25 years later, he sets out to find his lost family.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA3NjkzNjg2MF5BMl5BanBnXkFtZTgwMDkyMzgzMDI@._V1_SY1000_CR0,0,681,1000_AL_.jpg"
        },
        {
            title: "Taxi Driver",
            year: 1976,
            genres: ['Drama', 'Crime'],
            ratings: [5, 5, 4, 3, 5],
            descript: "A mentally unstable Vietnam War veteran works as a night-time taxi driver in New York City where the perceived decadence and sleaze feeds his urge for violent action, attempting to save a preadolescent prostitute in the process.",
            img: " https://images-na.ssl-images-amazon.com/images/M/MV5BNGQxNDgzZWQtZTNjNi00M2RkLWExZmEtNmE1NjEyZDEwMzA5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,654,1000_AL_.jpg"
        },
        {
            title: "The Warriors",
            year: 1979,
            genres: ['Action', 'Thriller'],
            ratings: [5, 5, 5, 4, 5, 5],
            descript: "In the near future, a charismatic leader summons the street gangs of New York City in a bid to take it over. When he is killed, The Warriors are falsely blamed and now must fight their way home while every other gang is hunting them down.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BYTU2MWRiMTMtYzAzZi00NGYzLTlkMDEtNWQ3MzZlNTJlNzZkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SY1000_CR0,0,656,1000_AL_.jpg"
        },
        {
            title: "It",
            year: 2017,
            genres: ['Drama', 'Thriller'],
            ratings: [2],
            descript: "In a small town in Maine, seven children known as The Losers Club come face to face with life problems, bullies and a monster that takes the shape of a clown called Pennywise.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMWZkZjgxNmMtNDQ0NC00NWFjLWE4MjEtODllNDU5ZDAxMWIyXkEyXkFqcGdeQXVyNDA5Mzc4MTU@._V1_.jpg"
        },
        {
            title: "Star Wars",
            year: 1977,
            genres: ['Action', 'Sci-Fi'],
            ratings: [5, 4, 3, 5, 3, 5],
            descript: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SY1000_CR0,0,664,1000_AL_.jpg"
        },
        {
            title: "Moonlight",
            year: 2016,
            genres: ['Drama'],
            ratings: [3, 5, 3, 4, 4, 3],
            descript: "A timeless story of human self-discovery and connection, Moonlight chronicles the life of a young black man from childhood to adulthood as he struggles to find his place in the world while growing up in a rough neighborhood of Miami.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
        },
        {
            title: "Her",
            year: 2013,
            genres: ['Drama', 'Romance', 'Sci-Fi'],
            ratings: [3, 2, 3, 1, 2],
            descript: "A lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_.jpg"
        },
        {
            title: "Walk The Line",
            year: 2005,
            genres: ['Drama', 'Biography'],
            ratings: [4, 5, 3, 3, 4, 5],
            descript: "A chronicle of country music legend Johnny Cash's life, from his early days on an Arkansas cotton farm to his rise to fame with Sun Records in Memphis, where he recorded alongside Elvis Presley, Jerry Lee Lewis, and Carl Perkins.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyOTU3MjUxOF5BMl5BanBnXkFtZTcwMTQ0NjYzMw@@._V1_SY1000_CR0,0,672,1000_AL_.jpg"
        },
        {
            title: "Lars And The Real Girl",
            year: 2005,
            genres: ['Drama', 'Romance', 'Comedy'],
            ratings: [3, 3, 4, 2, 3],
            descript: "A delusional young man strikes up an unconventional relationship with a doll he finds on the Internet.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI4NDc1NDkwMV5BMl5BanBnXkFtZTcwNjgzMDE1MQ@@._V1_.jpg"
        },
        {
            title: "Blue Valentine",
            year: 2010,
            genres: ['Drama', 'Romance'],
            ratings: [5, 5, 4, 3, 2, 4],
            descript: "The relationship of a contemporary married couple, charting their evolution over a span of years by cross-cutting between time periods.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU4MTQ2MzA1Ml5BMl5BanBnXkFtZTcwODE3NTgwNA@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
        },
        {
            title: "Raging Bull",
            year: 1980,
            genres: ['Drama', 'Biography'],
            ratings: [3, 3, 4, 3, 5],
            descript: "An emotionally self-destructive boxer's journey through life, as the violence and temper that leads him to the top in the ring destroys his life outside it.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxOTg3OTc5MF5BMl5BanBnXkFtZTcwNzkwNjMwNA@@._V1_SY1000_CR0,0,666,1000_AL_.jpg"
        },
        {
            title: "Million Dollar Baby",
            year: 2004,
            genres: ['Drama'],
            ratings: [3, 3, 4, 3, 3],
            descript: "A determined woman works with a hardened boxing trainer to become a professional.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxNzA1NDQxOV5BMl5BanBnXkFtZTcwNTkyMTIzMw@@._V1_SY1000_CR0,0,678,1000_AL_.jpg"
        },
        {
            title: "Boys Don’t Cry",
            year: 1999,
            genres: ['Drama', 'Biography', 'Crime'],
            ratings: [5, 5, 5, 3, 5],
            descript: "Female-born Teena Brandon adopts his male identity of Brandon Teena and attempts to find himself and love in Nebraska.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BN2YyODgyYjMtN2ZiZC00OWMzLTg1NjgtZGIwN2NlYTYxMTkwXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_.jpg"
        },
        {
            title: "Gilbert Grape",
            year: 1993,
            genres: ['Drama'],
            ratings: [5, 5, 3, 4, 5, 3],
            descript: "After his father's death, Gilbert has to care for his mentally disabled brother, Arnie, and his morbidly obese mother, which is suddenly challenged when love walks into his life.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BY2EyZDlhNjItODYzNi00Mzc3LWJjOWUtMTViODU5MTExZWMyL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_SX674_AL_.jpg"
        },
        {
            title: "The Wolf Of Wall Street",
            year: 2013,
            genres: ['Comedy', 'Biography', 'Crime'],
            ratings: [5, 4, 5, 5, 3, 1],
            descript: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
        },
        {
            title: "Wall-E",
            year: 2008,
            genres: ['Animation', 'Kids', 'Adventure'],
            ratings: [3, 2, 3, 4],
            descript: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
        },
        {
            title: "21 Gram",
            year: 2003,
            genres: ['Drama', 'Crime', 'Thriller'],
            ratings: [2, 3, 2, 4, 5],
            descript: "A freak accident brings together a critically ill mathematician, a grieving mother, and a born-again ex-con.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4MjI2OTM5N15BMl5BanBnXkFtZTcwNDA1NjUzMw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
        },
        {
            title: "Despicable Me",
            year: 2010,
            genres: ['Animation', 'Kids', 'Comedy', 'Adventure'],
            ratings: [4, 4, 4, 5, 3],
            descript: "When a criminal mastermind uses a trio of orphan girls as pawns for a grand scheme, he finds their love is profoundly changing him for the better.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3NjY0MTQ0Nl5BMl5BanBnXkFtZTcwMzQ2MTc0Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
        },
        {
            title: "Shrek",
            year: 2001,
            genres: ['Animation', 'Kids', 'Comedy', 'Adventure'],
            ratings: [3, 3, 4, 5, 2],
            descript: "After his swamp is filled with magical creatures, Shrek agrees to rescue Princess Fiona for a villainous lord in order to get his land back.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,671,1000_AL_.jpg"
        },
        {
            title: "Get Hard",
            year: 2015,
            genres: ['Comedy', 'Crime'],
            ratings: [1, 3, 2, 3],
            descript: "When millionaire James King is jailed for fraud and bound for San Quentin, he turns to Darnell Lewis to prep him to go behind bars.",
            img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc3OTc1NjM0M15BMl5BanBnXkFtZTgwNjAyMzE1MzE@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
        }
    ];

    /**
     * Variable declaration for moviedisplay elements
     */

    const movieList = document.getElementById("displayMovies");
    const newMovieList = document.getElementById("displayNewMovie");

    return {

        /**
         * Object.prototype.constructor function creates a prototype for movies object
         * @param {String} title 		Movie title
         * @param {Number} year 		Movie release year
         * @param {Array} genres 		Genres for movie
         * @param {Array} ratings		Ratings for movie
         * @param {String} descript 	Description of movie
         * @param {String} img 		    Img-URL for movie
         */
        movieConstructor: function(title, year, genres, ratings, descript, img) {
            this.title = title;
            this.year = year;
            this.genres = [genres];
            this.ratings = [ratings];
            this.descript = descript;
            this.img = img;
        },


        /**
         * Function to push new movie objects to movies array 
         * @param {Object}         Movie object
         */
        addNewMovie: (movie) => {
            movies.push(movie);

        },


        /**
         * Function to save values from form and create new movie object
         */
        movieAddedByForm: () => {
            let titleInput = document.getElementById('title').value;
            let yearInput = document.getElementById('year').value;

            //Get input from checkboxes and returns array of selected values
            const getGenresFromCheckbox = (genres) => {
                const result = [];
                const checkboxes = document.getElementsByClassName("genres");
                for (let i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        result.push(checkboxes[i].value);
                    }
                }
                return result;
            };
            let genInput = getGenresFromCheckbox();
            let rateInput = document.getElementById('ratings').value;
            let descInput = document.getElementById('description').value;
            let imgUrlInput = document.getElementById('imgUrl').value;

            //Creates a new object with prototype of movieConstructor
            const newMovie = new MovieDataBase.movieConstructor(titleInput, yearInput, genInput, rateInput, descInput, imgUrlInput);

            /**
             * Call addNewMovie function with parameter
             * @param  {Object}        New movie object
             */
            MovieDataBase.addNewMovie(newMovie);

            //Displays the new movie to interface
            const movieHtml = `<div class="movieDiv"><p>Title: ${newMovie.title}</p>
<p>Year: ${newMovie.year}</p>
<p>Genres: ${newMovie.genres}</p>
<p>Rating: ${MovieDataBase.sumUp(newMovie.ratings)} /5</p>
<p>Description: ${newMovie.descript}</p>
<img  src="${newMovie.img}" width="300" height="430" class="image">
<form id="rating">
  <input  type="radio" name="rating" value="1">
  <label>1</label>
  <input  type="radio" name="rating" value="2">
  <label>2</label>
  <input  type="radio" name="rating" value="3">
  <label>3</label>
  <input  type="radio" name="rating" value="4" >
  <label>4</label>
  <input  type="radio" name="rating" value="5" checked>
  <label>5</label>
<button class="submit" type="button" name="${newMovie.title}" onclick="MovieDataBase.addMovieRate()">RATE: ${newMovie.title}</button>
</form></div>`;

            newMovieList.innerHTML = movieHtml;


        },
        /**
         * Get all movies 
         * @return {Array}    Array of all movies 
         */
        getMovies: (movie) => {
            return movies;
        },

        /**
         * Calculate avarage rating for movie
         * @param  {Object}     Movie object
         * @return {Number}		Avarage rating 
         */
        sumUp: (rates) => {
            var avg = rates.map((c, i, arr) => c / arr.length).reduce((p, c) => c + p);
            return avg.toFixed(1);
        },

        /**
         * Get movies for this year
         * @return {Array}		Array of all movies released this year  
         */

        getMoviesThisYear: (year) => {
            //Get this value for this year
            const date = new Date();
            const thisYear = date.getFullYear();

            return movies.filter((movie) => {
                return movie.year == thisYear;
            });
        },

        //Displays movies for this year when thisYearMovieBtn is clicked
        showMoviesThisYear: () => {
            newMovieList.innerHTML = "";
            movieList.innerHTML = "";

            const movThisYear = MovieDataBase.getMoviesThisYear(year);

            let showList;
            for (prop in movThisYear) {
                showList = `<div class="movieDiv">
<p>Title: ${movThisYear[prop].title}</p>
<p>Year: ${movThisYear[prop].year}</p>
<p>Genres: ${movThisYear[prop].genres}</p>
 <p>Rating: ${MovieDataBase.sumUp( movThisYear[prop].ratings)} /5</p>
<p>Description: ${movThisYear[prop].descript}</p>
<img  src="${movThisYear[prop].img}" width="300" height="430" class="image">
<form id="rating">
  <input  type="radio" name="rating" value="1">
  <label>1</label>
  <input  type="radio" name="rating" value="2">
  <label>2</label>
  <input  type="radio" name="rating" value="3">
  <label>3</label>
  <input  type="radio" name="rating" value="4" >
  <label>4</label>
  <input  type="radio" name="rating" value="5" checked>
  <label>5</label>
   <button class="submit" type="button" name="${movThisYear[prop].title}" onclick="MovieDataBase.addMovieRate()">RATE: ${movThisYear[prop].title}</button>
</form></div>
`;
                movieList.innerHTML += showList;
            };

        },

        /**
         * Get movies by genre
         * @return {Array}    Array of all movies by selected genre
         */

        movieByGenre: (genres) => {
            //Get value for selected genre
            const x = document.getElementById("genres").selectedIndex;
            const genre = document.getElementsByTagName("option")[x].value;
            return movies.filter((movie) =>
                    movie.genres.some((genres) => genres === genre))
                .map(movie => {
                    return movie;
                }, 0);


        },
        //Displays movies for this year when movieByGenreBtn is clicked
        showMovByGenre: () => {

            newMovieList.innerHTML = "";
            movieList.innerHTML = "";
            const showMovies = MovieDataBase.movieByGenre(genres);

            let showList;

            for (movie in showMovies) {
                showList = `<div class="movieDiv">
<p>Title: ${showMovies[movie].title}</p>
<p>Year: ${showMovies[movie].year}</p>
<p>Genres: ${showMovies[movie].genres}</p>
 <p>Rating: ${MovieDataBase.sumUp( showMovies[movie].ratings)} /5</p>
<p>Description: ${showMovies[movie].descript}</p>
<img  src="${showMovies[movie].img}" width="300" height="430" class="image">
<form id="rating">
  <input  type="radio" name="rating" value="1">
  <label>1</label>
  <input  type="radio" name="rating" value="2">
  <label>2</label>
  <input  type="radio" name="rating" value="3">
  <label>3</label>
  <input  type="radio" name="rating" value="4" >
  <label>4</label>
  <input  type="radio" name="rating" value="5" checked>
  <label>5</label>
  <button class="submit" type="button" name="${showMovies[movie].title}" onclick="MovieDataBase.addMovieRate()">RATE: ${showMovies[movie].title}</button>
</form></div>
`;
                movieList.innerHTML += showList;
            };
        },


        //Display all movies when showAllMovieBtn is clicked
        getAllMovies: () => {
            newMovieList.innerHTML = "";
            movieList.innerHTML = "";
            let listAllMovies = movies.map(movie =>
                movie = `<div class="movieDiv">
                <p class="selMov" id"${movie.title}">Title: ${movie.title}</p>
            <p>Year: ${movie.year}</p>
            <p>Genres: ${movie.genres}</p>
           <p>Ratings: ${MovieDataBase.sumUp(movie.ratings)} /5</p>
            <p>Description: ${movie.descript}</p>
            <img src="${movie.img}" width="300" height="430" class="image">
            <form id="rating">
              <input  type="radio" name="rating" value="1">
              <label>1</label>
              <input  type="radio" name="rating" value="2">
              <label>2</label>
              <input  type="radio" name="rating" value="3">
              <label>3</label>
              <input  type="radio" name="rating" value="4" >
              <label>4</label>
              <input  type="radio" name="rating" value="5" checked>
              <label>5</label>
              <button class="submit" type="button" name="${movie.title}" onclick="MovieDataBase.addMovieRate()">RATE: ${movie.title}</button>
            </form></div>`
            );
            movieList.innerHTML = listAllMovies.sort(); //Sort to list in alphabetic order
        },
        /**
         * Calculate the rating of a movie
         * @param  {Object}     
         * @return {Number}		Ratings
         */
        getRate: (movie) => {
            const sumOfRatings = movie.ratings.reduce((total, rating) => {
                return total + rating;
            }, 0);
            const numberOfRatings = movie.ratings.length;

            return (sumOfRatings / numberOfRatings).toFixed(1);
        },

        /**
         * Get the movie with highest rating
         * @return {Object}
         */

        movieByTopRating: () => {
            return movies.reduce((preVal, val) => {
                if (MovieDataBase.getRate(preVal) < MovieDataBase.getRate(val)) {

                    return val;
                } else {

                    return preVal;
                }
            });
        },

        /**
         * Get the movie with lowest rating
         * @return {Object}
         */
        movieByWorstRating: () => {
            return movies.reduce((preVal, val) => {
                if (MovieDataBase.getRate(preVal) > MovieDataBase.getRate(val)) {
                    return val;
                } else {
                    return preVal;
                }
            });
        },

        //Display top rated movie when topMovieBtn is clicked
        getTopMovie: () => {
            const movie = MovieDataBase.movieByTopRating();
            movieList.innerHTML = "";
            newMovieList.innerHTML = "";

            let movieHtml = `
            <div class="movieDiv">
            <p>Title: ${movie.title}</p>
            <p>Year: ${movie.year}</p>
            <p>Genres: ${movie.genres}</p>
            <p>Rating: ${MovieDataBase.sumUp(movie.ratings)} /5</p>
            <p>Description: ${movie.descript}</p>
            <img src="${movie.img}" width="300" height="430" class="image">
            <form id="rating">
              <input  type="radio" name="rating" value="1">
              <label>1</label>
              <input  type="radio" name="rating" value="2">
              <label>2</label>
              <input  type="radio" name="rating" value="3">
              <label>3</label>
              <input  type="radio" name="rating" value="4">
              <label>4</label>
              <input  type="radio" name="rating" value="5" checked>
              <label>5</label>
             <button class="submit" type="button" name="${movie.title}" onclick="MovieDataBase.addMovieRate()">RATE: ${movie.title}</button>
            </form></div>`;
            movieList.innerHTML = movieHtml;


        },
        //Display top rated movie when worstMovieBtn is clicked
        getWorstMovie: () => {
            const movie = MovieDataBase.movieByWorstRating();
            movieList.innerHTML = "";
            newMovieList.innerHTML = "";

            let movieHtml = `
            <div class="movieDiv">
            <p>Title: ${movie.title}</p>
            <p>Year: ${movie.year}</p>
            <p>Genres: ${movie.genres}</p>
            <p>Rating: ${MovieDataBase.sumUp(movie.ratings)} /5</p>
            <p>Description: ${movie.descript}</p>
            <img src="${movie.img}" width="300" height="430" class="image">
            <form id="rating">
              <input  type="radio" name="rating" value="1">
              <label>1</label>
              <input  type="radio" name="rating" value="2">
              <label>2</label>
              <input  type="radio" name="rating" value="3">
              <label>3</label>
              <input  type="radio" name="rating" value="4" >
              <label>4</label>
              <input  type="radio" name="rating" value="5" checked>
              <label>5</label>
             <button class="submit" type="button" name="${movie.title}" onclick="MovieDataBase.addMovieRate()">RATE: ${movie.title}</button>
            </form></div>`;
            movieList.innerHTML = movieHtml;

        }
    };

})();