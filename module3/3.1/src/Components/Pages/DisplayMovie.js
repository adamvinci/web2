import { readMovies } from "../../Models/movies";





const DisplayMovie = () => {
    const main = document.querySelector('main')

    main.innerHTML = '<div id="movieWrapper"></div>';

    const movieWrapper = document.querySelector('#movieWrapper');

    const movies = readMovies();

    const html = displayMovie(movies);


     movieWrapper.innerHTML = html;

};

function displayMovie(movies) {

    let tableHtml= `
    <table class="table" >
    <thead>
    <tr>
    <th>Ttile</th>
    <th>Duration</th>
    <th>Budget</th>


    </tr>
    </thead>

    <tbody> `;
    movies.array.forEach(element => {
        tableHtml +=`
        
        <tr>
            <td> <a href= "${element.link}"> ${element.name}</a> </td>
            <td> ${element.duration}</td>
            <td> ${element.budget}</td>

        </tr>
        `;
    });

return tableHtml;

}





export default DisplayMovie;