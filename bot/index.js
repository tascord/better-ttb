const TwitchBot = require('../index')
const config = require('./config.json');
 
const client = new TwitchBot({
  username: config.username,
  oauth: config.oauth,
  channels: ['caykeXD', 'Blundxl']
});

client.on('connected', require('./events/connected.js'));
client.on('message', require('./events/message.js'));
client.on('err', require('./events/error.js'));

console.log(require('fakeid').username(require('fakeid').name(false)));