const readAllMovies= async (search)=>{
    // eslint-disable-next-line no-useless-catch
    try{
        let response=await fetch('api/film')
        
        if(search!== undefined){
            if(search.includes('duration')){
                response=await fetch(`/api/film/?order=${search}`);
            }else{
                response=await fetch(`/api/film/?search=${search}`);
            }
            
        }
       
        if(!response.ok){
                throw new Error(`readAllMovies:: fetch error : ${response.status} : ${response.statusText}`);
        }
        const film= await response.json();
        console.log(film)
        return film;
    }catch (err){
        
        throw err;
    }
};

async function deleteOneMovie(id) {
    if (!id) return undefined;
  
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(`/api/film/${id}`, options);
      if (!response.ok) {
        throw new Error(`deleteOneFilm :: fetch error : ${response.status} : ${response.statusText}`);
      }
     
      const deletedFilm = await response.json();
      return deletedFilm;
    } catch (err) {
      console.error('deleteOneMovie::error: ', err);
      throw err;
    }
  }
  
  const addOneMovie = async(movie)=>{
    // eslint-disable-next-line no-useless-catch
    try{
        const options={
            method:'POST',
            body:JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json',
              },
        }
        const response= await fetch('api/film',options)
        if(!response.ok) {
            throw new Error(`addMovie :: fetch error : ${response.status} : ${response.statusText}`);
        }
        const newFilm=await response.json();
        return newFilm
    }catch(err){
        throw err;
    }


  }

const updateMovie=async (id,content)=>{
        // eslint-disable-next-line no-useless-catch
        try {
            const options={
                method:'PATCH',
                body:JSON.stringify(content),
                headers:{
                    'Content-Type':'application/json'
                },
            }
            const response=await fetch(`api/film/${id}`,options)

            if(!response.ok){
                throw new Error(`update error :: fetch error : ${response.status} : ${response.statusText}`);
            } 
            const updatedFilm=await response.json();
            return updatedFilm;
        } catch (error) {
            throw error;
        }
}

  // eslint-disable-next-line import/prefer-default-export
    export {readAllMovies,deleteOneMovie,addOneMovie,updateMovie};