# Scaledrone Node.js Push API

Official Scaledrone Node.js pushing library

Allows for usage of all Scaledrone's [REST API](https://www.scaledrone.com/docs/rest) methods.

For the Node.js WebSocket API Client check out [this link](https://www.scaledrone.com/docs/quick-start/node-websocket).

## Installation

```bash
npm install scaledrone-node-push --save
```

## Usage

Create a new instance of Scaledrone passing it the `channelId` and `secretKey` that you can find from the channel's page:

```js
const Scaledrone = require('scaledrone-node-push');
const sd = new Scaledrone({
  channelId: 'CHANNEL_ID',
  secretKey: 'SECRET_KEY'
});
```

---

## Publishing a message

### Callback style

```js
const message = { foo: 'bar' };
const room = 'notifications';

sd.publish(room, message, function(error, reply) {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Message published!', reply);
});
```

### Async/await style

```js
(async () => {
  try {
    const message = { foo: 'bar' };
    const room = 'notifications';
    const reply = await sd.publish(room, message);
    console.log('Message published!', reply);
  } catch (err) {
    console.error(err);
  }
})();
```

---

## Publishing the same message to multiple rooms

### Callback style

```js
const message = { foo: 'bar' };
const rooms = ['notifications', 'lounge'];

sd.publish(rooms, message, function(error, reply) {
  if (error) {
    console.error(error);
    return;
  }
  console.log('Published to multiple rooms!', reply);
});
```

### Async/await style

```js
(async () => {
  const message = { foo: 'bar' };
  const rooms = ['notifications', 'lounge'];
  try {
    const reply = await sd.publish(rooms, message);
    console.log('Published to multiple rooms!', reply);
  } catch (err) {
    console.error(err);
  }
})();
```

---

## Get channel stats

```js
// Callback
sd.channelStats(function(error, reply) {
  if (error) return console.error(error);
  console.log(reply); // { users_count: 2 }
});

// Async/await
const stats = await sd.channelStats();
console.log(stats);
```

---

## Getting the list of users from all rooms

```js
// Callback
sd.members(function(error, reply) {
  if (error) return console.error(error);
  console.log(reply); // ['bcI:GPhz6A2T', 'b58:fnaJaEfh']
});

// Async/await
const members = await sd.members();
console.log(members);
```

---

## Getting the list of rooms that have users in them

```js
// Callback
sd.rooms(function(error, reply) {
  if (error) return console.error(error);
  console.log(reply); // ["room1", "room2"]
});

// Async/await
const rooms = await sd.rooms();
console.log(rooms);
```

---

## Getting the list of users in a room

```js
// Callback
sd.roomMembers('my-room', function(error, reply) {
  if (error) return console.error(error);
  console.log(reply); // ['bcI:GPhz6A2T', 'b58:fnaJaEfh']
});

// Async/await
const members = await sd.roomMembers('my-room');
console.log(members);
```

---

## Getting the list of rooms and their members

```js
// Callback
sd.allRoomMembers(function(error, reply) {
  if (error) return console.error(error);
  console.log(reply); // {"room1": ["user1", "user2"], "room2": ["user1"]}
});

// Async/await
const all = await sd.allRoomMembers();
console.log(all);
```