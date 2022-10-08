var express = require("express");
const { serialize, parse } = require("../utils/json");
var router = express.Router();
const jsonDbPath = __dirname + "/../data/pizzas.json";
const MENU = [
  {
    id: 1,
    title: "4fromages",
    content: "Gruyère, Sérac, Appenzel, Gorgonzola, Tomates",
  },
  {
    id: 2,
    title: "Vegan",
    content: "Tomates, Courgettes, Oignons, Aubergines, Poivrons",
  },
  {
    id: 3,
    title: "Vegetarian",
    content: "Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives",
  },
  {
    id: 4,
    title: "Alpage",
    content: "Gruyère, Mozarella, Lardons, Tomates",
  },
  {
    id: 5,
    title: "Diable",
    content: "Tomates, Mozarella, Chorizo piquant, Jalapenos",
  },
];

// Read all the pizzas from the menu
router.get("/", (req, res, next) => {
  const orderByTitle = req?.query?.order?.includes("title")
    ? req.query.order
    : undefined;
  let orderedMenu;
  console.log(`order by ${orderByTitle ?? "not requested"}`);
  const pizza = parse(jsonDbPath, MENU);
  if (orderByTitle)
    orderedMenu = [...pizza].sort((a, b) => a.title.localeCompare(b.title));
  if (orderByTitle === "-title") orderedMenu = orderedMenu.reverse();

  console.log("GET /pizzas");
  res.json(orderedMenu ?? pizza);
});

// Read the pizza identified by an id in the menu
router.get("/:id", (req, res) => {
  console.log(`GET /pizzas/${req.params.id}`);
  const pizza = parse(jsonDbPath, MENU);
  const indexOfPizzaFound = pizza.findIndex(
    (pizza) => pizza.id == req.params.id
  );

  if (indexOfPizzaFound < 0) return res.sendStatus(404);

  res.json(pizza[indexOfPizzaFound]);
});

// Create a pizza to be added to the menu.
router.post("/", (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content =
    req?.body?.content?.length !== 0 ? req.body.content : undefined;

  console.log("POST /pizzas");

  if (!title || !content) return res.sendStatus(400); // error code '400 Bad request'
  const pz = parse(jsonDbPath, MENU);
  const lastItemIndex = pz?.length !== 0 ? pz.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? pz[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newPizza = {
    id: nextId,
    title: title,
    content: content,
  };

  pz.push(newPizza);
  serialize(jsonDbPath, pz);
  res.json(newPizza);
});
// Update a pizza based on its id and new values for its parameters
router.patch("/:id", (req, res) => {
  console.log(`PATCH /pizzas/${req.params.id}`);

  const title = req?.body?.title;
  const content = req?.body?.content;

  console.log("POST /pizzas");

  if ((!title && !content) || title?.length === 0 || content?.length === 0)
    return res.sendStatus(400);
  const p = parse(jsonDbPath, MENU);
  const foundIndex = p.findIndex((pizza) => pizza.id == req.params.id);

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedPizza = { ...p[foundIndex], ...req.body };

  p[foundIndex] = updatedPizza;
  serialize(jsonDbPath, p);
  res.json(updatedPizza);
});

module.exports = router;
