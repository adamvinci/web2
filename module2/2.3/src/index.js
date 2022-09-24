import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

const myForm = document.querySelector('form');
const linesInput = document.getElementById('nLine');
const columnsInput = document.getElementById('ncOl');
const startStringInput = document.getElementById('ValString');
const tableWrapper = document.querySelector('#tab');
const linesTab= document.getElementById('line');
const columnsTab = document.getElementById('column');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const expectedArray = createArray(linesInput.value, columnsInput.value, startStringInput.value);
    linesTab.innerText='fafr'
    tableWrapper.innerHTML = expectedArray;
  });



function createArray( nbline,nbCol,text){
    const tab=[];
    for(let i=0;i<nbline;i+=1){
      tab.push([]);
        
        for(let y=0;y<nbCol;y+=1){
           tab[i].push(`${text}[${nbline}][${nbCol}]`);
        }
        
    }

return tab;

}

