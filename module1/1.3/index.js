const btn1 = document.querySelector('#myBtn1');
const btn2 = document.querySelector('#myCmpt');
 var cmpt=0;


 btn1.onclick = function() {
    cmpt++;
    btn2.innerHTML=cmpt;
  
    if(cmpt >5 && cmpt<9){
       
        btn1.innerText=' Bravo, bel échauffement ';
        
    }else if(cmpt>9){
        btn1.innerText = 'Vous êtes passé maître en l art du clic !)';
    }

  };  

  
  