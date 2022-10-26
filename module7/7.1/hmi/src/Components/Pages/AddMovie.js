

import { addOneMovie } from "../../Models/movies";
import Navigate from "../Router/Navigate"

const addMoviePage=`
  
<form>
  <div class="form-group col-md-6">
    <label >Enter title</label>
    <input type="text" class="form-control" id="name" placeholder="Enter title">

  </div>
  <div class="form-group col-md-6">
    <label >Enter duration(min)</label>
    <input type="number" class="form-control" id="duration" placeholder="Enter duration">
  </div>
  <div class="form-group col-md-6">
  <label >Enter budget</label>
  <input type="number" class="form-control" id="budget" placeholder="Enter budget">
  </div>
  <div class="form-group col-md-6">
  <label >Enter Link (optional)</label>
  <input type="url" class="form-control" id="link" placeholder="Enter link">
  </div>
  <button type="submit" class="btn btn-primary ">Submit</button>
</form>
`



const AddMoviePage = async () => {

  const main = document.querySelector('main');
  main.innerHTML = addMoviePage;
  const form= document.querySelector('form')
  const name=document.getElementById('name')
  const budget=document.getElementById('budget')
  const link=document.getElementById('link')
  const duration=document.getElementById('duration')
  
  form.addEventListener('submit',async (e) =>{
    e.preventDefault();
    const movie={
      title:name.value,
      budget:budget.value,
      duration:duration.value,
      link:link.value,
    };
    await addOneMovie(movie);

    Navigate('/viewMovie')
  });
 


};



export default AddMoviePage;
