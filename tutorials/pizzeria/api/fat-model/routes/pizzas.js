const express = require('express');
const path = require('node:path');
const { readAllPizzas, readOnePizza, createOnePizza, deleteOnePizza,updateOnePizza } = require('../models/pizza');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/pizzas.json');

const MENU = [
  {
    id: 1,
    title: '4 fromages',
    content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
  },
  {
    id: 2,
    title: 'Vegan',
    content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
  },
  {
    id: 3,
    title: 'Vegetarian',
    content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
  },
  {
    id: 4,
    title: 'Alpage',
    content: 'Gruyère, Mozarella, Lardons, Tomates',
  },
  {
    id: 5,
    title: 'Diable',
    content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
  },
];

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const orderByTitle =readAllPizzas(req?.query?.order)

  return res.json(orderByTitle);
});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  const pizzas = readOnePizza(req.params.id)

  if (!pizzas) return res.sendStatus(404);

  return res.json(pizzas);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'

  const newPizza =createOnePizza(title,content)

  return res.json(newPizza);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {

  const p= deleteOnePizza(req.params.id);

  if (!p) return res.sendStatus(404);



  return res.json(p);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const content = req?.body?.content;

  if ((!title && !content) || title?.length === 0 || content?.length === 0) {
    return res.sendStatus(400);
  }
  const changeP= updateOnePizza(req.params.id,{title,content})

  if(!changeP) res.sendStatus(404);


  return res.json(changeP);
});

module.exports = router;
