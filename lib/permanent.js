var tokenized = require('./tokenized');
var permanentUrl = 'https://api.weixin.qq.com/cgi-bin/material/';
/* eslint camelcase: [2, {properties: "never"}] */

module.exports = {
  news: function (settings, app, json, cb) {
    tokenized.json(settings, app, permanentUrl + 'add_news?', json, {}, cb);
  },
  create: function (settings, app, type, file, cb, description) {
    var params = {
      type: type
    };
    switch (type) {
      case 'image':
      case 'voice':
      case 'thumb':
        break;
      case 'video':
        params.description = description;
        break;
      default :
        cb(true, {errmsg: 'Invalid type'});
        return;
    }
    tokenized.file(settings, app, permanentUrl + 'add_material?', file, params, cb);
  },

  get: function (settings, app, mediaId, cb) {
    var data = {
      media_id: mediaId
    };
    tokenized.json(settings, app, permanentUrl + 'get_material?', data, {}, cb);
  },
  remove: function (settings, app, mediaId, cb) {
    var data = {
      media_id: mediaId
    };
    tokenized.json(settings, app, permanentUrl + 'del_material?', data, {}, cb);
  },
  update: function (settings, app, data, cb) {
    tokenized.json(settings, app, permanentUrl + 'update_news?', data, {}, cb);
  }
};
