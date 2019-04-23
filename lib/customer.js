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


const listCustomer = () => {
    const spinner = ora('Wait to fetch customer list... \n').start();
    axios.get(apiUrl + '/customers', config)
        .then((response) => {
            //console.log(response.data);
            //console.log(response.status);
            //console.log(response.statusText);
            //console.log(response.headers);
            //console.log(response.config);
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
        });
};


const searchCustomer = (nameStr) => {
    const spinner = ora('Searching ... \n').start();
    axios.get(apiUrl + '/customers/' + nameStr,
        config)
        .then((response) => {
            //console.log(response.data);
            //console.log(response.status);
            //console.log(response.statusText);
            //console.log(response.headers);
            //console.log(response.config);
            if (response.status == 200) {
                spinner.succeed('Customers containing ' + nameStr + ' in name:');
                return response.data.forEach(item => {
                    console.log(item);
                    console.log('\n');
                });

            }
        }).catch((err) => {
            console.log(err);
            return spinner.fail('User registration failed.');
        });
};


module.exports = { addCustomer, listCustomer, searchCustomer };