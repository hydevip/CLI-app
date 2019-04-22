#!/usr/bin/env node


const Configstore = require('configstore');
const pkg = require('./package.json');

// Create a Configstore instance
const config = new Configstore(pkg.name);

config.clear();
//config.set('token.username', '' );
//config.set('token.token', '' );
console.log(config.all);
//=> true
