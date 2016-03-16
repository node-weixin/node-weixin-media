'use strict';
var assert = require('assert');
var validator = require('validator');
var media = require('../');
var fs = require("fs");
var path = require("path");

var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};


function validit(number) {
  assert.equal(true, typeof number === 'number'
  && validator.isNumeric(String(number)) && number >= 0);

}

describe('node-weixin-media node module', function () {

  var config = require("node-weixin-config");
  config.app.init(app);


  var mediaId = null, newsId = null;

  it('should be able to upload a temporary media', function (done) {
    var file = path.resolve(__dirname, "media/image.jpg");

    media.temporary.create(app, 'image', file, function (error, json) {
      assert.equal(true, json.type === 'image');
      assert.equal(true, typeof json.media_id === 'string');
      mediaId = json.media_id;
      assert.equal(true, typeof json.created_at === 'number' && validator.isNumeric(String(json.created_at)) && !!new Date(json.created_at));
      done();
    });
  });


  it('should be able to get a temporary media', function (done) {
    var tmp = require('tmp');
    var file = tmp.tmpNameSync();
    media.temporary.get(app, mediaId, file, function (error) {
      assert(!error);
      done();
    });
  });

  it('should be able to get a temporary media', function (done) {
    var tmp = require('tmp');
    var file = tmp.tmpNameSync();
    media.temporary.get(app, mediaId, file, function (error) {
      assert(!error);
      assert(fs.existsSync(file));
      done();
    });
  });


  it('should be able to upload a permanent media', function (done) {
    var file = path.resolve(__dirname, "media/image.jpg");
    media.permanent.create(app, 'image', file, function (error, json) {
      assert.equal(true, typeof json.media_id === 'string');
      mediaId = json.media_id;
      assert.equal(true, validator.isURL(json.url));
      done();
    });
  });

  it('should be able to upload a permanent media of video', function (done) {
    var file = path.resolve(__dirname, "media/image.mp4");
    media.permanent.create(app, 'video', file, function () {
      done();
    }, 'this is an video');
  });

  it('should be able to upload a permanent media of video', function (done) {
    var file = path.resolve(__dirname, "media/image.mp4");
    media.permanent.create(app, 'sss', file, function (error, json) {
      assert.equal(true, error);
      assert.equal(true, json.errmsg === 'Invalid type');
      done();
    }, 'this is an video');
  });

  it('should be able to get a permanent media', function (done) {
    var tmp = require('tmp');
    var file = tmp.tmpNameSync();

    media.permanent.get(app, mediaId, function (error, body) {
      fs.writeFileSync(file, new Buffer(body));
      done();
    });
  });

  it('should be able to create a permanent news', function (done) {
    var json = {
      "articles": [{
        "title": 'hello',
        "thumb_media_id": mediaId,
        "author": 'author',
        "digest": 'digest',
        "show_cover_pic": 0,
        "content": 'content',
        "content_source_url": 'http://www.sina.com.cn'
      }]
    };
    media.permanent.news(app, json, function (error, json) {
      newsId = json.media_id;
      assert.equal(true, !error);
      assert.equal(true, typeof json.media_id === 'string');
      done();
    });
  });


  it('should be able to update a permanent news', function (done) {
    var json =     {
      "media_id": newsId,
      "index": 0,
      "articles": {
        "title": 'hello1',
        "thumb_media_id": mediaId,
        "author": 'author2',
        "digest": 'digest1',
        "show_cover_pic": 0,
        "content": 'content1',
        "content_source_url": 'http://www.sina.com.cn'
      }
    };
    media.permanent.update(app, json, function (error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.errcode === 0);
      assert.equal(true, data.errmsg === 'ok');
      done();
    });
  });

  it('should be able to get media count', function (done) {
    media.count(app, function (error, json) {
      validit(json.voice_count);
      validit(json.video_count);
      validit(json.image_count);
      validit(json.news_count);
      done();
    });
  });

  it('should be able to get media list', function (done) {
    var type = 'image';   //Type of media
    var offset = 0;       //
    var limit = 5;        //Range from 1 ~ 20

    media.list(app, type, limit, offset, function (error, json) {
      validit(json.total_count);
      validit(json.item_count);
      for (var i = 0; i < json.item.length; i++) {
        var item = json.item[i];
        assert.equal(true, item.media_id.length > 0);
      }
      done();
    });
  });

  it('should be able to remove a permanent news', function (done) {
    media.permanent.remove(app, newsId, function (error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.errcode === 0);
      assert.equal(true, data.errmsg === 'ok');
      done();
    });
  });
});
