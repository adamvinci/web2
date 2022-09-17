

    const green = document.querySelector('#green');
    const orange = document.querySelector('#orange');
    const red = document.querySelector('#red');
let timeoutID;
   window.addEventListener("load",greenlight);
    
    function greenlight(){
        green.style.backgroundColor = "green"
        timeoutID = setTimeout(() => {
            green.style.backgroundColor = "white"
            orange.style.backgroundColor = "orange"
          }, 2000);
       
        timeoutID = setTimeout(() => {
            orange.style.backgroundColor = "white"
            red.style.backgroundColor = 'red';
          }, 4000);

       red.style.backgroundColor='white'

    }
    setInterval(greenlight, 6000);

    
 
    



