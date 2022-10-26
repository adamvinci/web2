import { deleteOneMovie, readAllMovies, updateMovie } from "../../Models/movies";
import { getAuthenticatedUser } from "../../utils/auth";
import Navigate from "../Router/Navigate";





const DisplayMovie = async (movie) => {
    
    const main = document.querySelector('main')

    main.innerHTML = '<div id="wrapper"> </div>';

    const movieD=document.querySelector('#wrapper')

    const movies = await readAllMovies(movie);


    const html = displayMovie(movies);
    

    movieD.innerHTML=html;
    attachEventListener()

};

function displayMovie(movies) {
    const user=getAuthenticatedUser();
    let tableHtml= ` 
    <input type="text" id="textTosearch" placeholder="film qui commence par ..." > 
    <button type="submit" class='search' />Search</button>
    <div class="row justify-content-center">
    <button type="submit" class='order' data-element-order='duration' />ordre croissant</button>
    <button type="submit" class='order' data-element-order='-duration' />Ordre decroissant</button>
    <div class="col-auto">
   
    <table class="table">

    <thead>
    <tr>
    <th>Ttile</th>
    <th> Link </th> 
    <th>Duration</th>
    <th>Budget</th>
    <th>Operations</th>


    </tr>
    </thead>

    <tbody> `;
    movies.forEach((element) => {
        tableHtml +=`
      
        <tr>

        <td ${user ? 'contenteditable="true"' : ''}><a type="submit" class='oneFilm' data-element-id="${element.id}">${element.title}</a></td>
            <td ${user ? 'contenteditable="true"' : ''}> <a type="submit" > ${element.link} </a> </td>
            <td ${user ? 'contenteditable="true"' : ''}> ${element.duration} </td>
            <td ${user ? 'contenteditable="true"' : ''}> ${element.budget}</td>
           ${user ? `<td><button type="button" class="delete" data-element-id="${element.id}">Delete</button></td>
            <td><button type="button" class="upd" data-element-id="${element.id}">Update</button></td>` : ''}

        </tr>
        `;
    });

return tableHtml;

}


function attachEventListener(){

    const film=document.querySelector('#wrapper');
    film.querySelectorAll('.delete').forEach((button) =>{

        button.addEventListener('click',async(e) =>{
            const { elementId }=e.target.dataset;
            await deleteOneMovie(elementId);
            DisplayMovie();
            // eslint-disable-next-line no-console
            console.log("da")
        });
        

    })
    film.querySelectorAll('.upd').forEach((button)=>{
       
        button.addEventListener('click',async(e)=>{
           const {elementId} = e.target.dataset;
           const content=e.target.parentElement.parentElement;
           const updatedFilm={
            
            title:content.children[0].innerHTML,
            link:content.children[1].innerText,
            duration:content.children[2].innerHTML,
            budget:content.children[3].innerHTML,
           
        }
        
           await updateMovie(elementId,updatedFilm)
        

        })
      
    })



    film.querySelectorAll('.search').forEach((t)=>{
        t.addEventListener('click',async(e)=>{
            e.preventDefault();
            const textTosearch=document.querySelector('#textTosearch')
          DisplayMovie(textTosearch.value)
         
            
        })
    })
    film.querySelectorAll('.order').forEach((t)=>{
        t.addEventListener('click',async(e)=>{
         const {elementOrder}=e.target.dataset
            DisplayMovie(elementOrder);
          
         
            
        })
    })

    film.querySelectorAll('.oneFilm').forEach((link) => {

        link.addEventListener('click',async (e) => {
            const{elementId}=e.target.dataset

          Navigate(`/movie?id=${elementId}`)

        })
      });
 
}


export default DisplayMovie;