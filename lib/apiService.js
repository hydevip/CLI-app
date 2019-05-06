//MikkeL: Then handling of response is pretty similar every where. Is there a way to shorten this? (hint, a function could handle
// it in a consistent way, .eg , stopping the spinner, printing the result, handling the error)

const axios = require('axios');
const { setToken } = require('./config');

function postFromRest(spinner, url, body, succesMessage, failureMessage, config = '') {
    axios.post(url, body, config)
        .then(response => handleSuccesResponse(spinner, succesMessage, response))
        .catch(handleFailureResponse(spinner, failureMessage));
}

function postFromRestAndSetToken(spinner, url, body, succesMessage, failureMessage, config = '') {
    axios.post(url, body, config)
        .then(response => handleSuccesResponseAndSetToken(spinner, succesMessage, body.username, response))
        .catch(handleFailureResponse(spinner, failureMessage));
}

function getFromRest(spinner, url, succesMessage, failureMessage, config = '') {
    axios.get(url, config)
        .then(response => handleSuccesResponse(spinner, succesMessage, response))
        .catch(handleFailureResponse(spinner, failureMessage));
}

function handleFailureResponse(spinner, message) {
    return err => {
        console.log(err);
        return spinner.fail(message);
    };
}

function handleSuccesResponse(spinner, message, response) {
    if (response.status == 200 || 201) { 
        spinner.succeed(message);
        console.log(response.data);
        return true;
    }
    return false;
}

function handleSuccesResponseAndSetToken(spinner, message, username, response) {
    if (handleSuccesResponse(spinner, message, response)) {
        setToken(username, response.data.token);
    }
}


module.exports = { getFromRest, postFromRest, postFromRestAndSetToken };