




import centerIcon from '../../img/centerIcon.png'
import avg1 from '../../img/avg1.png';
import avg2 from '../../img/avg2.png';
import avg3 from '../../img/avg3.png';



const homepage = `
<img src="${centerIcon}" alt="centerIcon" > <h1>My Movies</h1> 

<div class="liste">
  <div id="AlreadySeen">
  <ul><h4>Already Seen movies</h4>
    <li><img src="${avg1}" alt="avengers1"></li>
    <li><img src="${avg2}" alt="avengers2"></li>
    <li><img src="${avg3}" alt="avengers3"></li>
</div>
</ul>
<div id="ToSee">
<ul><h4>List:</h4>
<li><img src="${avg1}" alt="avengers1"></li>
    <li><img src="${avg2}" alt="avengers2"></li>
    <li><img src="${avg3}" alt="avengers3"></li>
</div>
</ul>
<div id="Reccomandation">
<ul><h4>Recommandation:</h4>
<li><img src="${avg1}" alt="avengers1"></li>
    <li><img src="${avg2}" alt="avengers2"></li>
    <li><img src="${avg3}" alt="avengers3"></li>
</div>
</ul>

</div>`






const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = homepage;
};

export default HomePage;
