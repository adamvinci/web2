import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const myForm = document.querySelector('form');
const linesInput = document.getElementById('nLine');
const columnsInput = document.getElementById('ncOl');
const startStringInput = document.getElementById('ValString');
const tableWrapper = document.getElementById('table');


myForm.addEventListener('submit', (e) => {

    e.preventDefault();
    createArray(linesInput.value, columnsInput.value, startStringInput.value);
  });



function createArray( nbline,nbCol,text){
    for(let i=0;i<nbline;i+=1){ 
        const row= tableWrapper.insertRow(i);      
        for(let y=0;y<nbCol;y+=1){ 
        const col= row.insertCell(y)
        col.innerHTML=` ${text}[${i}${y}] `;
        }
        
    }

}

