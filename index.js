const request = require('request');

const BASE_URL = 'https://api2.scaledrone.com';

class Scaledrone {
  constructor({channelId, secretKey} = {}) {
    if (!channelId) {
      throw new Error('ChannelId must be set');
    }
    if (!secretKey) {
      throw new Error('SecretKey must be set');
    }
    if (typeof channelId !== 'string') {
      throw new Error('ChannelId must be of type string');
    }
    if (typeof secretKey !== 'string') {
      throw new Error('SecretKey must be of type string');
    }

    this.auth = {
      user: channelId,
      pass: secretKey
    };

    this.channelId = channelId;
  }

  publish(roomName, message, callback) {
    if (typeof message !== 'object') {
      throw new Error('Message must be of type object');
    }

    if (Array.isArray(roomName)) {
      const rooms = roomName.map(room => `r=${room}`).join('&');
      request.post({
        baseUrl: BASE_URL,
        uri: `${this.channelId}/publish/rooms?${rooms}`,
        json: message,
        auth: this.auth
      }, wrapRequestCallback(callback));
    } else {
      request.post({
        baseUrl: BASE_URL,
        uri: `${this.channelId}/${roomName}/publish`,
        json: message,
        auth: this.auth
      }, wrapRequestCallback(callback));
    }
  }

  channelStats(callback) {
    request.get({
      baseUrl: BASE_URL,
      uri: `${this.channelId}/stats`,
      auth: this.auth
    }, wrapRequestCallback(callback, true));
  }

  members(callback) {
    request.get({
      baseUrl: BASE_URL,
      uri: `${this.channelId}/members`,
      auth: this.auth
    }, wrapRequestCallback(callback, true));
  }

  rooms(callback) {
    request.get({
      baseUrl: BASE_URL,
      uri: `${this.channelId}/rooms`,
      auth: this.auth
    }, wrapRequestCallback(callback, true));
  }

  roomMembers(roomName, callback) {
    request.get({
      baseUrl: BASE_URL,
      uri: `${this.channelId}/${roomName}/members`,
      auth: this.auth
    }, wrapRequestCallback(callback, true));
  }

  allRoomMembers(callback) {
    request.get({
      baseUrl: BASE_URL,
      uri: `${this.channelId}/room-members`,
      auth: this.auth
    }, wrapRequestCallback(callback, true));
  }
}

function wrapRequestCallback(callback, parseResponse) {
  return function(error, incomingMessage, response) {
    if (error) {
      callback(error);
    } else if (incomingMessage.statusCode >= 400) {
      try {
        response = JSON.parse(response).message;
      } catch (e) {
        //
      }
      callback(new Error(response));
    } else {
      if (parseResponse) {
        response = JSON.parse(response);
      }
      callback(null, response);
    }
  };
}

module.exports = Scaledrone;
