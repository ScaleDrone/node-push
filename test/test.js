var ScaleDrone = require('../index.js');
var test = require('tape');

var sd = new ScaleDrone({
  channelId: 'G3TYvCzoXtrIuEtQ',
  secretKey: 'M7Oc1DY2FgkCaUh4aQFC3TRV1R3RThPd'
});

test('publish', function (t) {
  sd.publish('notifications', {foo: 'bar'}, function (error, reply) {
    t.end(error);
  });
});

test('channelStats', function (t) {
  sd.channelStats(function (error, reply) {
    t.end(error);
  });
});

test('usersList', function (t) {
  sd.usersList(function (error, reply) {
    t.end(error);
  });
});
