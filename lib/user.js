#!/usr/bin/env node

const axios = require('axios');
const ora = require('ora');

const { apiUrl, setToken } = require('./config');



const registerUser = (username, password) => {
    const spinner = ora('Register a new user... \n').start();
    axios.post(apiUrl + '/users/register',
        {
            username: username,
            password: password
        })
        .then((response) => {
            if (response.status == 201) {
                return spinner.succeed('User ' + username + ' was registered');
            }
        }).catch((err) => {
            console.log(err);
            return spinner.fail('User registration failed.');
        });
};



const loginUser = (username, password) => {
    const spinner = ora('Wait to login... \n').start();
    axios.post(apiUrl + '/users/login',
        {
            username: username,
            password: password
        })
        .then((response) => {

            if (response.status == 200) {
                setToken(username, response.data.token);
                return spinner.succeed('Login successful for ' + username + ' .');
            }

        }).catch((err) => {
            console.log(err);
            return spinner.fail('Login failed.');
        });
};


module.exports = { registerUser, loginUser };