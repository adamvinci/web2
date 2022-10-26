const express = require('express');
const { login, register, getAllUser } = require('../models/auth');

const router = express.Router();

/* GET users listing. */
router.post('/login', (req, res) => {
    const userName=req?.body?.userName?.length !==0 ? req.body.userName:undefined;
    const password=req?.body?.password?.length !==0 ? req.body.password:undefined;
    if(!userName||!password) return res.sendStatus(400)

    const user=login(userName,password);
    if(!user) return res.sendStatus(401);
    return res.json(user);
});

router.post('/register', (req, res) => {
    const userName=req?.body?.userName?.length !==0 ? req.body.userName:undefined;
    const password=req?.body?.password?.length !==0 ? req.body.password:undefined;
    if(!userName||!password) return res.sendStatus(400)

    const user=register(userName,password);
    if(!user) return res.sendStatus(401);
    return res.json(user);
});

router.get('/', (req, res) => {
    const listUser=getAllUser();
    return res.json(listUser);
  });

module.exports = router;
