# Better TTB
Its *gooder* then the other one

## Install
Install via NPM
```
$ npm install better-ttb
```

## Example
```javascript
const TwitchClient = require('better-ttb')

const Client = new TwitchClient.{
  username: 'Xeno_Pog',
  oauth: 'oauth:how_how_is_he_pogging',
  channels: ['twitch']
})

Client.on('join', channel => {
  console.log(`Joined channel: ${channel}`)
})

Client.on('error', err => {
  console.log(err)
})

Client.on('message', message => {
  if(message.message === '!test') {
    Client.say('Command executed! PogChamp')
  }
})

```

## Events
### `connected - (client: TwitchBot)`
This event is emitted when the bot has connected to the IRC server.
#### Usage
```javascript
Client.on('connected', client => ... )
```

### `join - (channel: Object)`
This event is emitted when a channel has been joined successfully.
#### Usage
```javascript
Client.on('join', channel => ... )
```

### `part - (channel: Channel)`
This event is emitted when a channel has been left successfully.
#### Usage
```javascript
Client.on('part', channel => ... )
```


### `message - (message: Object)`
Emitted when a `PRIVSMSG` event is sent over IRC. The message (Chatter) object attributes can be found on the [Twitch developers site](https://dev.twitch.tv/docs/v5/guides/irc/#privmsg-twitch-tags)

#### Usage
```javascript
Client.on('message', message => ... )
```

#### Example Response
```javascript
{ color: '#3C78FD',
  display_name: 'XenoBranch',
  emotes: '88:18-25',
  id: 'c5ee7248-3cea-43f5-ae44-2916d9a1325a',
  mod: true,
  room_id: 44667418,
  sent_ts: 1501541672959,
  subscriber: true,
  tmi_sent_ts: 1501541673368,
  turbo: false,
  user_id: 44667418,
  user_type: 'mod',
  badges: { broadcaster: 1, subscriber: 0 },
  channel: '#XenoBranch',
  message: 'This is a message PogChamp',
  username: 'Kritzware' }
  ```

### `timeout - (event: Object)`
Emitted when a user is timed out in the chat. The `ban_reason` attribute is `null` when no reason message is used.

#### Chat Trigger
```javascript
XenoBranch: "/timeout {user} {duration} {reason}"
```

#### Usage
```javascript
Client.on('timeout', event => ... )
```

#### Example Response
```javascript
{ ban_duration: 10, // seconds
  ban_reason: 'Using a banned word',
  room_id: 44667418,
  target_user_id: 37798112,
  tmi_sent_ts: 1503346029068,
  type: 'timeout',
  channel: '#XenoBranch',
  target_username: 'blarev' }
```

### `subscription - (event: Object)`
Emitted when a user subscribes to a channel and chooses to share the subscription in chat.

#### Usage
```javascript
Client.on('subscription', event => ... )
```

#### Example Response
```javascript
{
  "badges": {
   "broadcaster": 1,
   "staff": 1,
   "turbo": 1
  },
  "channel": "#dallas",
  "color": "#008000",
  "display_name": "ronni",
  "emotes": null,
  "id": "db25007f-7a18-43eb-9379-80131e44d633",
  "login": "ronni",
  "message": "Great stream -- keep it up!", // null if no message given
  "mod": 0,
  "msg_id": "resub",
  "msg_param_months": 6,
  "msg_param_sub_plan": "Prime",
  "msg_param_sub_plan_name": "Prime",
  "room_id": 1337,
  "subscriber": 1,
  "system_msg": "ronni has subscribed for 6 months!",
  "tmi_sent_ts": 1507246572675,
  "turbo": 1,
  "user_id": 1337,
  "user_type": "staff"
}
```

### `ban - (event: Object)`
Emitted when a user is permanently banned from the chat. The `ban_reason` attribute is `null` when no reason message is used.

#### Usage
```javascript
Client.on('ban', event => ... )
```

#### Chat Trigger
```javascript
XenoBranch: "/ban {user} {reason}"
```

#### Example Response
```javascript
{ ban_reason: 'Using a banned word',
  room_id: 44667418,
  target_user_id: 37798112,
  tmi_sent_ts: 1503346078025,
  type: 'ban',
  channel: '#XenoBranch',
  target_username: 'blarev' }
```

### `error - (err: Object)`
Emitted when any errors occurs in the Twitch IRC channel, or when attempting to connect to a channel.

#### Error types
##### `Login authentication failed`
This error occurs when either your twitch username or oauth are incorrect/invalid.

Response:
```javscript
{ message: 'Login authentication failed' }
```

##### `Improperly formatted auth`
This error occurs when your oauth password is not formatted correctly. The valid format should be `"oauth:your-oauth-password-123"`.

Response:
```javscript
{ message: 'Improperly formatted auth' }
```

##### `Your message was not sent because you are sending messages too quickly`
This error occurs when a message fails to send due to sending messages too quickly. You can avoid this by making the bot a moderator in the channel, if applicable/allowed.

Response:
```javascript
{ message: 'Your message was not sent because you are sending messages too quickly' }
```

#### Usage
```javascript
Client.on('error', err => ... )
```

#### Example Response
```javascript
{ message: 'Some error happened in the IRC channel' }
```

### `close - ()`
This event is emitted when the irc connection is destroyed via the `Client.close()` method.
#### Usage
```javascript
Client.on('close', () => {
  console.log('closed bot irc connection')
})
```

## Methods
### `join(channel: String)`
Attempts to join a channel. If successful, emits the 'join' event.

#### Example
```javascript
Client.on('join', channel => {
  console.log(`Client joined ${channel}`);
});

Client.join('channel2')
```

### `part(channel: String)`
Attempts to part from a channel. If successful, emits the 'part' event.

#### Example
```javascript
Client.on('part', channel => {
  console.log(`Client left ${channel}`);
});

Client.part('channel2');
```

### `say(message: String, channel: []Channel, err: Callback)`
Send a message in the currently connected Twitch channel. `channels` parameter not needed when connected to a single channel. An optional callback is provided for validating if the message was sent correctly.

#### Example
```javascript
Client.say('This is a message');

Client.say('your mum (okay so the joke is that she is so incredibly large that she is longer than the 500 character limit)', err => {
  sent: false,
  message: 'Exceeded PRIVMSG character limit (500)'
  ts: '2017-08-13T16:38:54.989Z'
})

// If connected to multiple channels
Client.say('message to #channel1', 'channel1')
Client.say('message to #channel2', 'channel2')
```

### `timeout(username: String, channel: []Channel, duration: int, reason: String)`
Timeout a user from the chat. `channels` parameter not needed when connected to a single channel. Default `duration` is 600 seconds. Optional `reason` message.

#### Example
```javascript
Client.timeout('XenoBranch', 10)
// "XenoBranch was timed out for 10 seconds"

Client.timeout('XenoBranch', 5, 'Using a banned word (L)')
// "XenoBranch was timed out for 5 seconds, reason: 'Using a banned word (L)'"

Client.on('message', message => {
  if(message.message === 'xD') Client.timeout(message.username, 10)
})
```

### `ban(username: String, reason: String)`
Permanently ban a user from the chat. `channels` parameter not needed when connected to a single channel. Optional `reason` message.

#### Example
```javascript
Client.ban('XenoBranch')
// "XenoBranch is now banned from the room"

Client.timeout('XenoBranch', 'Using a banned word (L)')
// "XenoBranch is now banned from the room, reason: 'Using a banned word (L)'"

Client.on('message', message => {
  if(message.message === 'Ban me!') Client.ban(message.username)
})
```

### `close()`
Closes the Twitch irc connection. Client will be removed from the Twitch channel AND the irc server.

#### Example
```javascript
Client.close()
```