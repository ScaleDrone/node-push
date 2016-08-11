# ScaleDrone Node.js Push API

Official ScaleDrone Node.js pushing library

Allows for usage of all ScaleDrone's [REST API](https://www.scaledrone.com/docs/rest) methods.

## Installation
```
npm install scaledrone-node-push --save
```

## Usage
Create a new instance of ScaleDrone passing it the `channelId` and `secretKey` that you can find from the channel's page
```javascript
var ScaleDrone = require('scaledrone-node-push');
var sd = new ScaleDrone({
  channelId: 'G3TYvCzoXtrIuEtQ',
  secretKey: 'M7Oc1DY2FgkCaUh4aQFC3TRV1R3RThPd'
});
```

### Publishing a message
```javascript
var message = {foo: 'bar'}
  , room = 'notifications';
sd.publish(room, message, function (error) {
  // check for errors
});
```

### Publishing the same message to multiple rooms
```javascript
var message = {foo: 'bar'}
  , rooms = ['notifications', 'lounge'];
sd.publish(rooms, message, function (error) {
  // check for errors
});
```

## Get channel stats
```javascript
sd.channelStats(function (error, reply) {
  // check for errors
  console.log(reply); // { users_count: 2 }
});
```

### Get connected users list
```javascript
sd.usersList(function (error, reply) {
  // check for errors
  console.log(reply); // { users: [ 'bcI:GPhz6A2T', 'b58:fnaJaEfh' ] }
});
```
