var request = require('request');

var BASE_URL = 'https://api2.scaledrone.com'

function Client(options) {
  if (!(this instanceof Client)) {
    return new Client(options);
  }

  options = options || {};

  if (!options.channelId)
    throw new Error('ChannelId must be set');
  if (!options.secretKey)
    throw new Error('SecretKey must be set');
  if (typeof options.channelId !== 'string')
    throw new Error('ChannelId must be of type string');
  if (typeof options.secretKey !== 'string')
    throw new Error('SecretKey must be of type string');

  this.auth = {
    user: options.channelId,
    pass: options.secretKey
  }

  this.channelId = options.channelId;
}

Client.prototype.publish = function (roomName, message, callback) {
  if (typeof message !== 'object') {
    throw new Error('Message must be of type object');
  }

  if (Array.isArray(roomName)) {
    var rooms = roomName.map(function (room) {
      return 'r=' + room;
    }).join('&');
    request.post({
      baseUrl: BASE_URL,
      uri: this.channelId + '/publish/rooms?' + rooms,
      json: message,
      auth: this.auth
    }, wrapRequestCallback(callback));
  } else {
    request.post({
      baseUrl: BASE_URL,
      uri: this.channelId + '/' + roomName + '/publish',
      json: message,
      auth: this.auth
    }, wrapRequestCallback(callback));
  }
};

Client.prototype.channelStats = function (callback) {
  request.get({
    baseUrl: BASE_URL,
    uri: this.channelId + '/stats',
    auth: this.auth
  }, wrapRequestCallback(callback, true));
};

Client.prototype.usersList = function (callback) {
  request.get({
    baseUrl: BASE_URL,
    uri: this.channelId + '/users',
    auth: this.auth
  }, wrapRequestCallback(callback, true));
};

function wrapRequestCallback(callback, parseResponse) {
  return function (error, incomingMessage, response) {
    if (error) {
      callback(error);
    } else if (incomingMessage.statusCode >= 400) {
      try {
        response = JSON.parse(response).message;
      } catch (e) {}
      callback(new Error(response));
    } else {
      if (parseResponse) {
        response = JSON.parse(response);
      }
      callback(null, response);
    }
  }
}

module.exports = Client;
