#!/usr/bin/env node

const chalk = require('chalk');
const ora = require('ora');

const program = require('commander');
const { getToken } = require('./lib/config');

const { registerUser, loginUser } = require('./lib/user');
const { addCustomer, listCustomer } =require('./lib/customer');



program
  .version('0.1.0');

  token=getToken();
//console.log(token);
if (!token) {
  program
    .command('register <username> <password>')
    .alias('r')
    .description('Register a new user.')
    .action((username, password) => registerUser(username, password));

  program
    .command('login <username> <password>')
    .alias('l')
    .description('Login in order to manage customers.')
    .action((username, password) => loginUser(username, password));
} else {

  program
    .command('new <name> <email> <phone>')
    .alias('n')
    .description('Create a new customer.')
    .action((name,email,phone)=> addCustomer(name,email,phone));

  
    
  program
    .command('list')
    .alias('l')
    .description('List all customers.')
    .action(()=>listCustomer());

  program
    .command('search <name>')
    .alias('s')
    .description('Search a  customer.')
    .action();

}

program.parse(process.argv);