import { findOneMovie } from "../../Models/movies";








const ViewOneMoviePage = async () => {

  const main = document.querySelector('main');

  const id=window.location.search.split('=')[1]
  const movie=await findOneMovie(id);

  main.innerHTML=ViewMoviePage(movie);


  console.log(movie)
  


};

function ViewMoviePage(movie){
  const html=`
  dada
    ${movie.title}
    ${movie.content}
    `;
    return html;
}

  




export default ViewOneMoviePage ;