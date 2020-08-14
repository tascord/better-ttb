const chalk = require('chalk');

module.exports = (client) => {
    console.log(chalk.magenta(`Connected to account ${client.username}.`))
	console.log(chalk.blue(`Watching channels, ${client.channels}.`))
}