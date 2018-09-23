# Scaledrone Node.js Push API

Official Scaledrone Node.js pushing library

Allows for usage of all Scaledrone's [REST API](https://www.scaledrone.com/docs/rest) methods.

For the Node.js WebSocket API Client check out [this link](https://www.scaledrone.com/docs/quick-start/node-websocket).

## Installation
```
npm install scaledrone-node-push --save
```

## Usage
Create a new instance of Scaledrone passing it the `channelId` and `secretKey` that you can find from the channel's page
```javascript
const Scaledrone = require('scaledrone-node-push');
const sd = new Scaledrone({
  channelId: 'CHANNEL_ID',
  secretKey: 'SECRET_KEY'
});
```

### Publishing a message
```javascript
const message = {foo: 'bar'};
const room = 'notifications';
sd.publish(room, message, function(error) {
  // check for errors
});
```

### Publishing the same message to multiple rooms
```javascript
const message = {foo: 'bar'}
const rooms = ['notifications', 'lounge'];
sd.publish(rooms, message, function(error) {
  // check for errors
});
```

### Get channel stats
```javascript
sd.channelStats(function(error, reply) {
  // check for errors
  console.log(reply); // { users_count: 2 }
});
```

### Getting the list of users from all rooms
```javascript
sd.members(function(error, reply) {
  // check for errors
  console.log(reply); // ['bcI:GPhz6A2T', 'b58:fnaJaEfh']
});
```

### Getting the list of rooms that have users in them
```javascript
sd.rooms(function(error, reply) {
  // check for errors
  console.log(reply); // ["room1", "room2"]
});
```

### Getting the list of users in a room
```javascript
sd.roomMembers('my-room', function(error, reply) {
  // check for errors
  console.log(reply); // ['bcI:GPhz6A2T', 'b58:fnaJaEfh']
});
```

### Getting the list of rooms and their members
```javascript
sd.allRoomMembers(function(error, reply) {
  // check for errors
  console.log(reply); // {"room1": ["user1", "user2"], "room2": ["user1"]}
});
```
