const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/film.json');


const FILM = [
  {
    id: 1,
    title: 'Avengers 1',
    duration: '1h50',
    budget: '49M',
    link: 'https://fr.wikipedia.org/wiki/Avengers_(film)',
  },
  {
    id: 2,
    title: 'Avengers 2',
    duration: '2h',
    budget: '70M',
    link: 'https://fr.wikipedia.org/wiki/Avengers_:_L%27%C3%88re_d%27Ultron',
  },
  {
    id: 3,
    title: 'Avengers 3',
    duration: '3h',
    budget: '100M',
    link: 'https://fr.wikipedia.org/wiki/Avengers:_Infinity_War',
  },
  {
    id: 4,
    title: 'Avengers 4',
    duration: '2h30',
    budget: '150M',
    link: 'https://fr.wikipedia.org/wiki/Avengers:_Endgame',
  },
];

/* Read all the film from the menu
   GET /film?order=title:ascending orderbytitle
   GET /film?order=-title:descending orderbytitle
*/
router.get('/', (req, res) => {
  const films=parse(jsonDbPath,FILM)
  const orderByDuration =
    req?.query?.order?.includes('duration') ? req.query.order : undefined;
  let orderedMenu;

  const orderBySearch = req.query.search;


  console.log(`order by ${orderByDuration ?? 'not requested'}`);
  console.log(`search  ${orderBySearch ?? 'not requested'}`);
  if (orderByDuration) orderedMenu = [...FILM].sort((a, b) => a.duration.localeCompare(b.duration));
  if (orderByDuration === '-duration') orderedMenu = orderedMenu.reverse();

  const filmOfIndex = [];
  if (orderBySearch !== undefined) {
    for (let i = 0; i < films.length; i+=1) {
      const film = films[i].title.toUpperCase();
      if (film.startsWith(orderBySearch.toUpperCase()))
        filmOfIndex.push(films[i]);
    }
  }
  if (orderBySearch) { return res.json(filmOfIndex) }

    return res.json(orderedMenu ?? films)
  


});

// Read the film identified by an id in the menu

// eslint-disable-next-line consistent-return
router.get('/:id', (req, res) => {
  console.log(`GET /film/${req.params.id}`);
  const id = parseInt(req.params.id, 10);
  const films = parse(jsonDbPath, FILM);
  const indexOffilmFound = films.findIndex(

    (f) => f.id === id
  );
  console.log(indexOffilmFound)

  if (indexOffilmFound < 0) return res.sendStatus(404);

  res.json(films[indexOffilmFound]);
});


// Create a film to be added to the menu.
router.post('/', (req, res) => {
  const films=parse(jsonDbPath,FILM)
  const titleQ = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const durationQ = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budgetQ = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const linkQ = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /film');

  if (!titleQ || !durationQ || !budgetQ || !linkQ) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: titleQ,
    duration: durationQ,
    link: linkQ,
    budget: budgetQ,
  };

  films.push(newFilm);
  serialize(jsonDbPath,films)

  return res.json(newFilm);
});

// Delete a film from the menu based on its id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const fil=parse(jsonDbPath,FILM)
  console.log(`DELETE /film/${req.params.id}`);

  const foundIndex = fil.findIndex(f => f.id === id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = fil.splice(foundIndex, 1);
  serialize(jsonDbPath,fil)
  const itemRemoved = itemsRemovedFromMenu[0];

  return res.json(itemRemoved);
});

// Update a film based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const films=parse(jsonDbPath,FILM);
  const id= parseInt(req.params.id,10)
  console.log(`PATCH /film/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;


  console.log('POST /film');

  if ((!title && !duration && !link && !budget)
    || title?.length === 0 || duration?.length === 0 || link?.length === 0 || budget?.length === 0) return res.sendStatus(400);

  const foundIndex = films.findIndex(f => f.id === id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedPizza;
  serialize(jsonDbPath,films)

  return res.json(updatedPizza);
});

module.exports = router;
