import { deleteOneMovie, readAllMovies, updateMovie } from "../../Models/movies";




const DisplayMovie = async () => {
    const main = document.querySelector('main')

    main.innerHTML = '<div id="wrapper"> </div>';

    const movieD=document.querySelector('#wrapper')

    const movies = await readAllMovies();


    const html = displayMovie(movies);
    

    movieD.innerHTML=html;
    attachEventListener()

};

function displayMovie(movies) {

    let tableHtml= ` 
    <input type="text" id="textTosearch" placeholder="film qui commence par ..." > 
    <button type="submit" class='search' />Search</button>
    <div class="row justify-content-center">
    
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
            <td contenteditable="true">  ${element.title     }</td>
            <td contenteditable="true"> <a href= "${element.link}"> ${element.link} </a> </td>
            <td contenteditable="true"> ${element.duration} </td>
            <td  contenteditable="true"> ${element.budget}</td>
            <td><button type="button" class="delete" data-element-id="${element.id}">Delete</button></td>
            <td><button type="button" class="upd" data-element-id="${element.id}">Update</button></td>
            

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
        t.addEventListener('click',async()=>{
            const textTosearch=document.querySelector('#textTosearch')
          await readAllMovies(textTosearch.value)
            DisplayMovie()
        })
    })


 
}


export default DisplayMovie;