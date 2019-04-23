#!/usr/bin/env node
const Configstore= require('configstore');
const pkg = require('../package.json');

const apiUrl="https://whispering-oasis-70926.herokuapp.com";

const tokenStored= new Configstore(pkg.name);


 function setToken(username,token){
    tokenStored.set('token.username', username );
    tokenStored.set('token.token', token );

}

function getToken(){
    
   return tokenStored.get('token.token');
}





module.exports={ apiUrl, setToken , getToken};