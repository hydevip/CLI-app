#!/usr/bin/env node

//Mikkel: same thing here, handling of response is basically copy, paste. We need shorter code.
//Mikkel: could you make a generic "post" function so that takes only the path (and inserts the api urls itself).
//that way code is shorter, and you are not dependent on "axious" for posting (it can be changed to something else if need be)
const axios = require('axios');
const ora = require('ora');
const { apiUrl, setToken } = require('./config');
const { getFromRest, postFromRest, postFromRestAndSetToken } = require('./apiService');

const registerUser = (username, password) => {
  body = { username: username, password: password };
  const spinner = ora('Register a new user... \n').start();

  postFromRest(spinner, apiUrl + '/users/register', body, 'User ' + username + ' was registered', 'User registration failed.');
};

const loginUser = (username, password) => {
    body = { username: username, password: password };
    const spinner = ora('Wait to login... \n').start();

    postFromRestAndSetToken(spinner, apiUrl + '/users/login', body, 'Login successful for ' + username + ' .', 'User login failed.',username);
};

module.exports = { registerUser, loginUser };
