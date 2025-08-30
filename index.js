const isJSON = require('./is_json');

class Scaledrone {
  constructor({channelId, secretKey, baseURL} = {}) {
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

    this.baseURL = baseURL || 'https://api2.scaledrone.com';
    this.channelId = channelId;
  }

  // Public API

  publish(roomName, message, callback) {
    const object = isJSON(message);
    let body;
    let headers = {};
    if (object) {
      body = JSON.stringify(object);
      headers['Content-Type'] = 'application/json';
    } else {
      body = message + '';
      headers['Content-Type'] = 'text/plain';
    }

    let uri;
    if (Array.isArray(roomName)) {
      const rooms = roomName.map(room => `r=${room}`).join('&');
      uri = `${this.channelId}/publish/rooms?${rooms}`;
    } else {
      uri = `${this.channelId}/${roomName}/publish`;
    }

    const p = this._request(uri, { method: 'POST', headers, body }, /*parseResponse*/ false);
    return this._asCallback(p, callback);
  }

  channelStats(callback) {
    const p = this._request(`${this.channelId}/stats`, { method: 'GET' }, /*parseResponse*/ true);
    return this._asCallback(p, callback);
  }

  members(callback) {
    const p = this._request(`${this.channelId}/members`, { method: 'GET' }, /*parseResponse*/ true);
    return this._asCallback(p, callback);
  }

  rooms(callback) {
    const p = this._request(`${this.channelId}/rooms`, { method: 'GET' }, /*parseResponse*/ true);
    return this._asCallback(p, callback);
  }

  roomMembers(roomName, callback) {
    const p = this._request(`${this.channelId}/${roomName}/members`, { method: 'GET' }, /*parseResponse*/ true);
    return this._asCallback(p, callback);
  }

  allRoomMembers(callback) {
    const p = this._request(`${this.channelId}/room-members`, { method: 'GET' }, /*parseResponse*/ true);
    return this._asCallback(p, callback);
  }

  // Internals

  _asCallback(promise, callback) {
    if (typeof callback === 'function') {
      promise.then(res => callback(null, res)).catch(err => callback(err));
      return; // undefined (callback style)
    }
    return promise; // promise style
  }

  async _request(uri, init, parseResponse) {
    const url = `${this.baseURL}/${uri}`;
    const headers = {
      ...(init.headers || {}),
      'Authorization': 'Basic ' + Buffer.from(`${this.auth.user}:${this.auth.pass}`).toString('base64')
    };

    const res = await fetch(url, { ...init, headers });

    // Read body as text first (for uniform error handling)
    let text = '';
    try {
      text = await res.text();
    } catch (_) {
      // ignore
    }

    if (res.status >= 400) {
      let msg = text;
      try {
        msg = JSON.parse(text).message;
      } catch (_) {
        // keep raw text
      }
      throw new Error(msg);
    }

    if (!parseResponse) {
      // Match original publish() behavior: return raw response text
      return text;
    }

    // Parse JSON for the GET endpoints (match original)
    try {
      return JSON.parse(text);
    } catch (_) {
      // if server ever returns non-JSON, keep raw text
      return text;
    }
  }
}

module.exports = Scaledrone;