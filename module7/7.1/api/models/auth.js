
const jwt = require('jsonwebtoken');
const path = require('node:path');
const { parse,serialize } = require('../utils/json');

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h
const jsonDbPath = path.join(__dirname, '/../data/user.json');

const defaultUser = [
   {
    id:1,
    username:"admin",
    password:"admin",
   }

  ];

  function login(username,password){
    const user=findUsername(username);

    if(!user||user.password!==password) return undefined;
    const token= jwt.sign({username},jwtSecret,{expiresIn:lifetimeJwt})
    
    const AuthUser={username,token};
    return AuthUser;
  } 

  function findUsername(username){
    const user=parse(jsonDbPath,defaultUser);
    const indexFound= user.findIndex(u=>u.username===username);
    if(indexFound<0) return undefined;
    return user[indexFound];
  }
  function register(userName,password){
    const userAlreadyExisting=findUsername(userName);
    if(userAlreadyExisting) return undefined;
    createUser(userName,password);
    const token= jwt.sign({userName},jwtSecret,{expiresIn:lifetimeJwt})
    const AuthUser={userName,token}
    return AuthUser
  }

  function createUser(userName,passwordd){
    const users=parse(jsonDbPath,defaultUser);
    const newUser={
      id:getNextId(),
      username:userName,
      password:passwordd,
    }

    users.push(newUser);
    serialize(jsonDbPath,users);
    return newUser
    
  }
  function getNextId(){
    const users = parse(jsonDbPath, defaultUser);
    const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = users[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
  }
  function getAllUser(){
    const user=parse(jsonDbPath,defaultUser);
    return user;
  }
  module.exports = {
        login,findUsername,register,getAllUser
  }