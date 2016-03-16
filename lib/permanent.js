var tokenized = require('./tokenized');
var permanentUrl = 'https://api.weixin.qq.com/cgi-bin/material/';
/* eslint camelcase: [2, {properties: "never"}] */

module.exports = {
  news: function (app, json, cb) {
    tokenized.json(permanentUrl + 'add_news?', app, json, {}, cb);
  },
  create: function (app, type, file, cb, description) {
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
    tokenized.file(permanentUrl + 'add_material?', app, file, params, cb);
  },

  get: function (app, mediaId, cb) {
    var data = {
      media_id: mediaId
    };
    tokenized.json(permanentUrl + 'get_material?', app, data, {}, cb);
  },
  remove: function (app, mediaId, cb) {
    var data = {
      media_id: mediaId
    };
    tokenized.json(permanentUrl + 'del_material?', app, data, {}, cb);
  },
  update: function (app, data, cb) {
    tokenized.json(permanentUrl + 'update_news?', app, data, {}, cb);
  }
};
