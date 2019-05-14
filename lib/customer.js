#!/usr/bin/env node

//Much much better!!
const ora = require('ora');

const { apiUrl, getToken } = require('./config');
const { getFromRest, postFromRest } = require('./apiService');

const token = getToken();
const config = { headers: { Authorization: 'bearer ' + token }};

const addCustomer = (name, email, phone) => {
    body= { name: name, email: email, phone: phone };
  const spinner = ora('Adding a new customer... \n').start();
  postFromRest(spinner, apiUrl + '/customers', body, 'Customer ' + name + ' was created in the database', 'Customer registration failed.', config);
};

const listCustomer = () => {
  const spinner = ora('Wait to fetch customer list... \n').start();
  getFromRest( spinner, apiUrl + '/customers', 'Customers list was fetched successful.', 'Customer list could not be fetched.', config);
};

const searchCustomer = nameStr => {
  const spinner = ora('Searching ... \n').start();
  getFromRest( spinner, apiUrl + '/customers/' + nameStr, 'Customers containing ' + nameStr + ' in name:', 'Customer search failed.', config);
};

module.exports = { addCustomer, listCustomer, searchCustomer};




