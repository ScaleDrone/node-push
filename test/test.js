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

test('usersList', function(t) {
  sd.usersList(function(error) {
    t.end(error);
  });
});
