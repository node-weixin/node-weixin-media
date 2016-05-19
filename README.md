# node-weixin-media 

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 


> Media Api for weixin

微信多媒体API

微信多媒体API是([node-weixin-api](https://github.com/node-weixin/node-weixin-api) 或者 [node-weixin-express](https://github.com/node-weixin/node-weixin-express))的一个子项目。
它提供:

1. 菜单API共计7个:

  temporary.create: 上传多媒体(临时)
  
  temporary.get: 获取多媒体(临时)
  
  permanent.news: 获取
  
  permanent.create: 上传多媒体(永久)
  
  permanent.get: 获取多媒体(永久)
  
  permanent.remove: 删除多媒体(永久)
  
  permanent.update: 更新多媒体(永久)
  
  count:  获取组列表
  
  list: 创建新组
  

3. 所有数据返回格式采用json,并与腾讯api上说明一致。回调函数格式如下：
    function(error, json) {
    //error为false表示返回正常
    //json对应api说明
    }
    
注:

交流QQ群: 39287176

 [node-weixin-express](https://github.com/node-weixin/node-weixin-express)是基于node-weixin-*的服务器端参考实现。

 [node-weixin-api](https://github.com/node-weixin/node-weixin-api)是基于node-weixin-*的API接口SDK。


## Usage

```js
var media = require('node-weixin-media');
var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};
var auth = require("node-weixin-auth");
var settings = require("node-weixin-settings");
```

###创建临时多媒体 [接口文档](http://mp.weixin.qq.com/wiki/5/963fc70b80dc75483a271298a76a8d59.html)

```js
var file = path.resolve(__dirname, "media/image.jpg");
media.temporary.create(settings, app, 'image', file, function (error, json) {
  //json.type
  //json.media_id
});
```

###获取临时多媒体 [接口文档](http://mp.weixin.qq.com/wiki/11/07b6b76a6b6e8848e855a435d5e34a5f.html)

```js
var file = path.resolve(__dirname, "output/temporary.jpg");
media.temporary.get(settings, app, mediaId, file, function (error) {
});
```

###创建永久多媒体 [接口文档](http://mp.weixin.qq.com/wiki/14/7e6c03263063f4813141c3e17dd4350a.html)

```js
var file = path.resolve(__dirname, "media/image.jpg");
media.permanent.create(settings, app, 'image', file, function (error, json) {
  //json.media_id
  //json.url
});
```

###获取永久多媒体 [接口文档](http://mp.weixin.qq.com/wiki/4/b3546879f07623cb30df9ca0e420a5d0.html)

```js
media.permanent.get(settings, app, mediaId, function (error, body) {
  var file = path.resolve(__dirname, "permanent.jpg");
  fs.writeFileSync(file, new Buffer(body));
});
```

###创建永久图文素材 [接口文档](http://mp.weixin.qq.com/wiki/14/7e6c03263063f4813141c3e17dd4350a.html)

```js
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
media.permanent.update(settings, app, json, function (error, data) {
});
```

###更新永久图文素材 [接口文档](http://mp.weixin.qq.com/wiki/4/19a59cba020d506e767360ca1be29450.html)


```js
var json = {
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
media.permanent.update(app, auth, json, function (error, data) {

});
```

###删除永久素材 [接口文档](http://mp.weixin.qq.com/wiki/5/e66f61c303db51a6c0f90f46b15af5f5.html)

```js
media.permanent.remove(settings, app, newsId/mediaId, function (error, data) {
});
```

###获取素材总数 [接口文档](http://mp.weixin.qq.com/wiki/16/8cc64f8c189674b421bee3ed403993b8.html)

```js
media.count(settings, app, function (error, json) {
  //json.voice_count
  //json.video_count
  //json.image_count
  //json.news_count
});
```

###获取素材总数 [接口文档](http://mp.weixin.qq.com/wiki/16/8cc64f8c189674b421bee3ed403993b8.html)

```js
media.count(settings, app, function (error, json) {
  //json.voice_count
  //json.video_count
  //json.image_count
  //json.news_count
});
```

###获取素材列表 [接口文档](http://mp.weixin.qq.com/wiki/12/2108cd7aafff7f388f41f37efa710204.html)

```js
media.permanent.remove(settings, app, newsId, function (error, data) {
});
```



```sh
$ npm install --global node-weixin-media
$ node-weixin-media --help
```


## License

Apache-2.0 © [calidion](calidion.github.io)


[npm-image]: https://badge.fury.io/js/node-weixin-media.svg
[npm-url]: https://npmjs.org/package/node-weixin-media
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-media.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-media
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-media.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-media
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-media/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-media
