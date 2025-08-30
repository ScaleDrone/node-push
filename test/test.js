const Scaledrone = require('../index.js');
const test = require('tape');

const sd = new Scaledrone({
  channelId: 'G3TYvCzoXtrIuEtQ',
  secretKey: 'M7Oc1DY2FgkCaUh4aQFC3TRV1R3RThPd'
});

test('publish', function(t) {
  sd.publish('notifications', {foo: 'bar'}, function(error) {
    t.end(error);
  });
});

test('async', async t => {
  try {
    await sd.publish('notifications', {foo: 'bar'});
    t.end();
  } catch (err) {
    t.end(err);
  }
});

test('publish a string', function(t) {
  sd.publish('notifications', 'hello world', function(error) {
    t.end(error);
  });
});

test('publish a number', function(t) {
  sd.publish('notifications', 1.23, function(error) {
    t.end(error);
  });
});

test('publish to multiple rooms', function(t) {
  sd.publish(['notifications', 'lounge'], {to: 'multiple'}, function(error) {
    t.end(error);
  });
});

test('channelStats', function(t) {
  sd.channelStats(function(error) {
    t.end(error);
  });
});

test('async channelStats', async t => {
  try {
    const stats = await sd.channelStats();
    t.ok('users_count' in stats);
    t.end();
  } catch (error) {
    t.end(error);
  }
});

test('members', function(t) {
  sd.members(function(error) {
    t.end(error);
  });
});

test('rooms', function(t) {
  sd.rooms(function(error) {
    t.end(error);
  });
});

test('roomMembers', function(t) {
  sd.roomMembers('my-room', function(error) {
    t.end(error);
  });
});

test('allRoomMembers', function(t) {
  sd.allRoomMembers(function(error) {
    t.end(error);
  });
});
