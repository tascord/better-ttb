const chalk = require('chalk');

module.exports = (message) => {
    console.log(message);
    message.client.say('bruh');
}