#!/usr/bin/env node

const axios = require('axios');
const ora = require('ora');

const { apiUrl, getToken } = require('./config');

const token = getToken();
const config = {
    headers: { 'Authorization': "bearer " + token }
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
            if (response.status == 201) {
                spinner.succeed('Customer ' + name + ' was created in the database');
                return console.log(response.data.createdCustomer);
            }
        }).catch((err) => {
            console.log(err);
            return spinner.fail('User registration failed.');
        });
};


const listCustomer = () => {
    const spinner = ora('Wait to fetch customer list... \n').start();
    axios.get(apiUrl + '/customers', config)
        .then((response) => {
            if (response.status == 200) {
                //console.log(response.data.token);
                spinner.succeed('Customers list was fetched successful.');
                return response.data.forEach(item => {
                    console.log(item);
                    console.log('\n');
                });
            }
        }).catch((err) => {
            console.log(err);
            return spinner.fail('Customer list failed.');
        });
};


const searchCustomer = (nameStr) => {
    const spinner = ora('Searching ... \n').start();
    axios.get(apiUrl + '/customers/' + nameStr,
        config)
        .then((response) => {
            if (response.status == 200) {
                spinner.succeed('Customers containing ' + nameStr + ' in name:');
                return response.data.forEach(item => {
                    console.log(item);
                    console.log('\n');
                });

            }
        }).catch((err) => {
            console.log(err);
            return spinner.fail('Customer search failed.');
        });
};


module.exports = { addCustomer, listCustomer, searchCustomer };