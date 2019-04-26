#!/usr/bin/env node
//Mikkel: same thing here, handling of response is basically copy, paste. We need shorter code.

const registerUser = (username, password) => {
    const spinner = ora('Register a new user... \n').start();
    //Mikkel: could you make a generic "post" function so that takes only the path (and inserts the api urls itself).
    //that way code is shorter, and you are not dependent on "axious" for posting (it can be changed to something else if need be)
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
            if (response.status == 200) {
                //console.log(response.data.token);
                setToken(username, response.data.token);
                return spinner.succeed('Login successful for ' + username + ' .');
            }

        }).catch((err) => {
            console.log(err);
        });
};


module.exports = { registerUser, loginUser };