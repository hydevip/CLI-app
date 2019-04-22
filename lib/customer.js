#!/usr/bin/env node

const axios = require('axios');
const ora = require('ora');

const {apiUrl, getToken}=require('./config');

const token=getToken();
const config ={
    headers: {'Authorization': "bearer " + token}
};

const addCustomer = (name, email, phone) => {
    const spinner = ora('Adding a new customer... \n').start();
    axios.post(apiUrl + '/customers',
        {
            name: name,
            email: email,
            phone: phone
        },
        config)
        .then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            //console.log(response.headers);
            //console.log(response.config);
            if (response.status == 201) {
                return spinner.succeed('Customer ' + name + ' was created in the database');
            }
        }).catch((err) => {
            //console.log(err);
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
            //console.log(response.data);
            //console.log(response.status);
            //console.log(response.statusText);
            //console.log(response.headers);
            //console.log(response.config);
            if (response.status == 200) {
                //console.log(response.data.token);
                setToken(username, response.data.token);
                return spinner.succeed('Login successful for ' + username + ' .');
            }

        }).catch((err) => {
            console.log(err);
        });



};


module.exports = { addCustomer };