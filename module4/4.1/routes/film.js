var express = require('express');
var router = express.Router();

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

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res, next) => {
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
    for (let i = 0; i < FILM.length; i++) {
      let film = FILM[i].title.toUpperCase();
      if (film.startsWith(orderBySearch.toUpperCase()))
        filmOfIndex.push(FILM[i]);
    }
  }
  if (orderBySearch) { return res.json(filmOfIndex) }
  else {
    return res.json(orderedMenu ?? FILM)
  }


});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  console.log(`GET /film/${req.params.id}`);

  const filmOfIndex = FILM.findIndex(f => f.id == req.params.id);

  if (filmOfIndex < 0) return res.sendStatus(404);

  return res.json(FILM[filmOfIndex]);
});


// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

  console.log('POST /film');

  if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'

  const lastItemIndex = FILM?.length !== 0 ? FILM.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? FILM[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title: title,
    duration: duration,
    link: link,
    budget: budget,
  };

  FILM.push(newFilm);

  return res.json(newFilm);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  console.log(`DELETE /pizzas/${req.params.id}`);

  const foundIndex = FILM.findIndex(f => f.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromMenu = FILM.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromMenu[0];

  return res.json(itemRemoved);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  console.log(`PATCH /pizzas/${req.params.id}`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;


  console.log('POST /pizzas');

  if ((!title && !duration && !link && !budget)
    || title?.length === 0 || duration?.length === 0 || link?.length === 0 || budget?.length === 0) return res.sendStatus(400);

  const foundIndex = FILM.findIndex(f => f.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = { ...FILM[foundIndex], ...req.body };

  FILM[foundIndex] = updatedPizza;

  return res.json(updatedPizza);
});

module.exports = router;
