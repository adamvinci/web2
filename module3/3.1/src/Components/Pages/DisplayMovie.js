import { readMovies } from "../../Models/movies";





const DisplayMovie = () => {
    const main = document.querySelector('main')

    main.innerHTML = '<div id="wrapper"> </div>';

    const movieD=document.getElementById('wrapper')

    const movies = readMovies();

    const html = displayMovie(movies);


    movieD.innerHTML=html;

};

function displayMovie(movies) {

    let tableHtml= ` 
    <div class="row justify-content-center">
    
    <div class="col-auto">
   
    <table class="table">

    <thead>
    <tr>
    <th>Ttile</th>
    <th>Duration</th>
    <th>Budget</th>


    </tr>
    </thead>

    <tbody> `;
    movies.forEach((element) => {
        tableHtml +=`
        
        <tr>
            <td> <a href= "${element.link}"> ${element.title    }</a> </td>
            <td> ${element.duration}</td>
            <td> ${element.budget}</td>

        </tr>
        `;
    });

return tableHtml;

}





export default DisplayMovie;